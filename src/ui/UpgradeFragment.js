import React from "react";
import { upgradeResource } from "../core/GameState";

export default function UpgradeFragment({ resources }) {
    const getUpgradeBonus = (upgrade, effect, purchasedUpgrades) => {
        if (!effect) return "No effect";

        // count upgrades
        let upgradeCount = 0;
        for (let item of purchasedUpgrades) if (item === upgrade) upgradeCount++;
        if (upgradeCount === 0) return "Not purchased";

        if (effect.type === "multiplicative") {
            let totalMultiplier = [];
            if (effect.energy) {
                totalMultiplier.push(["energy", Math.pow(effect.energy, upgradeCount)]);
            }
            if (effect.water) {
                totalMultiplier.push(["water", Math.pow(effect.water, upgradeCount)]);
            }
            if (effect.nutrients) {
                totalMultiplier.push(["nutrients", Math.pow(effect.nutrients, upgradeCount)]);
            }
            if (effect.oxygen) {
                totalMultiplier.push(["oxygen", Math.pow(effect.oxygen, upgradeCount)]);
            }

            let allModifiers = "";
            for (let [name, value] of totalMultiplier) {
                let capitalized = name.charAt(0).toUpperCase() + name.slice(1);
                allModifiers += `${capitalized} ×${value.toFixed(2)} `;
            }
            return allModifiers;
        } else if (effect.type === "additive") {
            let totalBonus = [];
            if (effect.energy) {
                totalBonus.push(["energy", effect.energy * upgradeCount]);
            }
            if (effect.water) {
                totalBonus.push(["water", effect.water * upgradeCount]);
            }
            if (effect.nutrients) {
                totalBonus.push(["nutrients", effect.nutrients * upgradeCount]);
            }
            if (effect.oxygen) {
                totalBonus.push(["oxygen", effect.oxygen * upgradeCount]);
            }

            let allBonuses = "";
            for (let [name, value] of totalBonus) {
                let capitalized = name.charAt(0).toUpperCase() + name.slice(1);
                allBonuses += `${capitalized} +${value}/s `;
            }
            return allBonuses;
        }


        return "Unknown effect type";
    };

    return (
        <div className="upgrade-fragment">
            <div className="organelles-upgrades">
                {Object.entries(resources.upgradeCosts).map(([upgrade, details]) => {
                    const { description, effect, cost } = details;
                    const canAfford = Object.entries(cost).every(([res, amount]) => resources[res] >= amount);
                    const bonus = getUpgradeBonus(upgrade, effect, resources.purchasedUpgrades);

                    return (
                        <div key={upgrade} className="upgrade-container">
                            <button
                                className="upgrade-button"
                                onClick={() => upgradeResource(upgrade)}
                                disabled={!canAfford}
                            >
                                <strong>{upgrade.charAt(0).toUpperCase() + upgrade.slice(1)}</strong>
                                {description && <p className="upgrade-description">{description}</p>}
                                <p className="upgrade-cost">
                                    Cost: {Object.entries(cost).map(([res, amount]) => `${amount} ${res}`).join(" + ")}
                                </p>
                                {bonus && <p className="upgrade-bonus">Current: {bonus}</p>}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
