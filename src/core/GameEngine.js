import React from "react";

export class GameEngine {
    constructor() {
        this.resources = {
            energy: 10,
            nutrients: 0,
            water: 10,
            oxygen: 0
        }
    }

    tick (delta) {

    }

    getState() {
        return this.resources;
    }
}