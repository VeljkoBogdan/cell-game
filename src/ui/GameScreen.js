import React, { useEffect, useState } from "react";
import { subscribe, unsubscribe } from "../core/GameState";
import "./gameScreen.css";
import MainFragment from "./MainFragment";
import UpgradeFragment from "./UpgradeFragment";

export default function GameScreen({ viewMode }) {
    const [resources, setResources] = useState({
        energy: 10,
        nutrients: 0,
        water: 10,
        oxygen: 0,
        dna: 0,
        cells: 1,

        productionRates: {
            energy: 100,
            nutrients: 100,
            water: 100,
            oxygen: 100,
            dna: 0,
            cells: 0
        },

        flags: {
            nucleus: false,
            replication: false
        },

        requirementsForNucleus: {
            energy: 1000,
            nutrients: 1000,
            water: 1000,
            oxygen: 1000
        },

        requirementsForReplication: {
            energy: 1000 * 100,
            nutrients: 1000 * 100,
            water: 1000 * 100,
            oxygen: 1000 * 100,
            dna: 10
        },

        upgradeCosts: {
            "cytoplasm": {
                description: "Increases all resource production by +1",
                cost: { energy: 10, water: 10 },
                effect: { energy: 1, nutrients: 1, water: 1, oxygen: 1, type: "additive" }
            },
            "mitochondria": {
                description: "Boosts energy production by x1.25",
                cost: { energy: 25, nutrients: 25 },
                effect: { energy: 1.25, type: "multiplicative" }
            },
            "vacuole": {
                description: "Increases water and nutrient production by x1.25",
                cost : { energy: 50, nutrients: 100, water: 100},
                effect: { water: 1.25, nutrients: 1.25, type: "multiplicative" }
            },
            "peroxisome": {
                "description": "Increases oxygen production by x1.25",
                cost: {energy:100, water: 50, nutrients: 75},
                effect: {oxygen: 1.25, type: "multiplicative"}
            }
        },

        purchasedUpgrades: []
    });

    useEffect(() => {
        let lastResourceState = {};

        const updateResources = (newState) => {
            lastResourceState = newState;
        };
        subscribe(updateResources);

        const uiInterval = setInterval(() => {
            setResources({ ...lastResourceState });
        }, 100);

        return () => {
            unsubscribe(updateResources);
            clearInterval(uiInterval);
        };
    }, []);

    return (
        <div className="game-screen">
            {/* Stuff above the line */}
            <div className="score-area">
                <div className="cell-score">
                    <h1 className="cell-score-header">
                        You have <span className="cell-number-text">{resources.cells}</span> cells
                    </h1>
                    <p className="cell-production-text">
                        You are gaining {resources.productionRates.cells} cells per second
                    </p>
                </div>

                <div className="resource-list">
                    { // Energy
                        (resources.productionRates.energy !== 0 || resources.energy !== 0) ?
                        <p className="energy-text">
                            Energy: {resources.energy.toFixed(2)}{" "}
                            <span className="production-text">({resources.productionRates.energy.toFixed(1)}/s)</span>
                        </p>
                        : null
                    }

                    { // Nutrients
                        resources.productionRates.nutrients !== 0 || resources.nutrients !== 0 ?
                            <div>
                                <span className="nutrients-text">
                                    Nutrients: {resources.nutrients.toFixed(2)}{" "}
                                </span>
                                <span className="production-text">({resources.productionRates.nutrients.toFixed(1)}/s)</span>
                            </div>
                        : null
                    }

                    { // Water
                        resources.productionRates.water !== 0 || resources.water !== 0 ?
                        <div>
                            <span className="water-text">
                                Water: {resources.water.toFixed(2)}{" "}
                            </span>
                            <span className="production-text">({resources.productionRates.water.toFixed(1)}/s)</span>
                        </div>
                        : null
                    }

                    { // Oxygen
                        resources.productionRates.oxygen !== 0 || resources.oxygen !== 0 ?
                        <div>
                            <span className="oxygen-text">
                                Oxygen: {resources.oxygen.toFixed(2)}{" "}
                            </span>
                            <span className="production-text">({resources.productionRates.oxygen.toFixed(1)}/s)</span>
                        </div>
                        : null
                    }

                    { // DNA
                        resources.productionRates.dna !== 0 || resources.dna !== 0 ?
                            <div>
                                <span className={"dna-text"}>
                                    DNA: {resources.dna.toFixed(2)}{" "}
                                </span>
                                <span className={"production-text"}> ({resources.productionRates.oxygen.toFixed(1)}/s) </span>
                            </div>
                        : null
                    }
                </div>
            </div>

            {/* The line */}
            <div className="line" />

            {/* Stuff below the line */}
            <div className="fragment-area">
                {viewMode === "main" ? (
                    <MainFragment resources={resources} />
                ) : viewMode === "upgrades" ? (
                    <UpgradeFragment resources={resources} />
                ) : (
                    <p>How are you here :P</p>
                )}
            </div>
        </div>
    );
}
