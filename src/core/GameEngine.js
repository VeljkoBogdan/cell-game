export class GameEngine {
    constructor() {
        this.resources = {
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

            requirementsForReplication: {
                energy: 1000,
                nutrients: 1000,
                water: 1000,
                oxygen: 1000,
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
        };
    }

    tick(delta) {
        this.resources.energy += this.resources.productionRates.energy * delta;
        this.resources.nutrients += this.resources.productionRates.nutrients * delta;
        this.resources.water += this.resources.productionRates.water * delta;
        this.resources.oxygen += this.resources.productionRates.oxygen * delta;
    }

    upgradeResource(upgradeType) {
        const upgrade = this.resources.upgradeCosts[upgradeType];
        if (!upgrade) return false;

        const canAfford = Object.entries(upgrade.cost)
            .every(([resource, amount]) => this.resources[resource] >= amount);

        if (canAfford) {
            // Deduct costs
            Object.entries(upgrade.cost).forEach(([resource, amount]) => {
                this.resources[resource] -= amount;
            });

            // Apply the upgrade effect
            if (upgrade.effect.type === "additive") {
                Object.entries(upgrade.effect).forEach(([resource, amount]) => {
                    if (resource !== "type") {
                        this.resources.productionRates[resource] += amount;
                    }
                });
            } else if (upgrade.effect.type === "multiplicative") {
                Object.entries(upgrade.effect).forEach(([resource, multiplier]) => {
                    if (resource !== "type") {
                        this.resources.productionRates[resource] *= multiplier;
                    }
                });
            }

            this.resources.purchasedUpgrades.push(upgradeType);

            Object.entries(upgrade.cost).forEach(([resource, amount]) => {
                this.resources.upgradeCosts[upgradeType].cost[resource] *= 2;
            });

            return true;
        }

        return false;
    }

    getState() {
        return this.resources;
    }
}
