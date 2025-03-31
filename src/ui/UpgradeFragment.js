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
            const totalMultiplier = Math.pow(effect.energy, upgradeCount);
            return `×${(totalMultiplier).toFixed(2)}`;
        } else if (effect.type === "additive") {
            const totalBonus = effect.energy * upgradeCount;
            return `+${totalBonus}/s`;
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
                                {bonus && <p className="upgrade-bonus">Current Bonus: {bonus}</p>}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
