import {GameEngine} from "./GameEngine";

const gameEngine = new GameEngine();
const subscribers = new Set();

export function subscribe(callback) {
    subscribers.add(callback);
}

export function unsubscribe(callback) {
    subscribers.delete(callback);
}

export function startGameLoop() {
    let lastTime = performance.now();

    function loop() {
        const now = performance.now();
        const delta = (now - lastTime) / 2000;
        lastTime = now;

        gameEngine.tick(delta);

        notifySubscribers();

        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
}

export function upgradeResource(upgradeType) {
    if (gameEngine.upgradeResource(upgradeType)) {
        notifySubscribers();
    }
}

export function canGetNucleus() {
    return gameEngine.canGetNucleus();
}

export function getNucleus() {
    gameEngine.getNucleus();
}

function notifySubscribers() {
    subscribers.forEach(callback => callback(gameEngine.getState()));
}