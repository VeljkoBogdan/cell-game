import React, {useEffect, useState} from "react";
import "./gameScreen.css"
import {subscribe, unsubscribe} from "../core/GameState";
import MainFragment from "./MainFragment";

export default function GameScreen() {
    const [resources, setResources] = useState({
        energy: 0,
        nutrients: 0,
        water: 10,
        oxygen: 0,
        cells: 0,

        productionRates: {
            energy: 0,
            nutrients: 0,
            water: 0,
            oxygen: 0
        },

        requirementsForReplication: {
            energy: 100,
            nutrients: 50,
            water: 50,
            oxygen: 100
        }
    })

    useEffect(() => {
        // last state of ui
        let lastResourceState = {}

        // function to update ui state
        const updateResources = (newState) => {
            lastResourceState = newState
        }
        subscribe(updateResources) // sub the ui state to update resources

        // function to update ui
        const uiInterval = setInterval(() => {
            setResources({ ...lastResourceState })
        }, 100)

        // cleanup
        return () => {
            unsubscribe(updateResources)
            clearInterval(uiInterval)
        }
    }, []);

    return (
        <div className="game-screen">
            <div className="score-area">
                <div className="cell-score" >
                    <h1 className="cell-score-header">
                        You have <span className="cell-number-text"> {resources.cells} </span> cells
                    </h1>
                    <p className="cell-production-text">
                        You are gaining {resources.productionRates.cells} cells per second
                    </p>
                </div>
                <div className="resource-list">
                    <p className="energy-text"> Energy: {resources.energy.toFixed(2) + " "}
                        <span className={"production-text"}>
                             ({resources.productionRates.energy.toFixed(1)}/s)
                        </span>
                    </p>
                    <p className="nutrients-text"> Nutrients: {resources.nutrients.toFixed(2) + " "}
                        <span className={"production-text"}>
                             ({resources.productionRates.nutrients.toFixed(1)}/s)
                        </span>
                    </p>
                    <p className="water-text"> Water: {resources.water.toFixed(2) + " "}
                        <span className={"production-text"}>
                             ({resources.productionRates.water.toFixed(1)}/s)
                        </span>
                    </p>
                    <p className="oxygen-text"> Oxygen: {resources.oxygen.toFixed(2) + " "}
                        <span className={"production-text"}>
                             ({resources.productionRates.oxygen.toFixed(1)}/s)
                        </span>
                    </p>
                </div>
            </div>
            <div className="line" />
            <div className="fragment-area">
                <MainFragment resources={resources} />
            </div>
        </div>
    )
}