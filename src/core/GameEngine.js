export class GameEngine {
    constructor() {
        this.resources = {
            energy: 10,
            nutrients: 0,
            water: 10,
            oxygen: 0,
            cells: 1,

            productionRates: {
                energy: 0.1,
                nutrients: 0,
                water: 0,
                oxygen: 0,
                cells: 0
            },

            requirementsForReplication: {
                energy: 100,
                nutrients: 50,
                water: 50,
                oxygen: 100
            }
        }
    }

    tick (delta) {
        this.resources.energy += this.resources.productionRates.energy * delta
        this.resources.nutrients += this.resources.productionRates.nutrients * delta
        this.resources.water += this.resources.productionRates.water * delta
        this.resources.oxygen += this.resources.productionRates.oxygen * delta

        //this.replicateIfPossible()
    }

    replicateIfPossible() {
    }

    getState() {
        return this.resources;
    }
}