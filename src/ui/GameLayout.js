import "./gameLayout.css";
import React, {useEffect} from "react";
import SideNavButton from "./SideNavButton";
import GameScreen from "./GameScreen";
import {startGameLoop} from "../core/GameState";

export default function GameLayout() {
    useEffect(() => {
        // GAME START
        startGameLoop()
    }, []);

    return (
        <div className="game-container">

            {/* Main Content (Game + Sidebars) */}
            <div className="main-content">

                {/* Left Navigation */}
                <div className="side-nav left-nav">
                    <SideNavButton side={"left"}> Main </SideNavButton>
                    <SideNavButton side={"left"}> Upgrades </SideNavButton>
                </div>

                {/* Game Screen (Center) */}
                <GameScreen />

                {/* Right Navigation */}
                <div className="side-nav right-nav">
                    <SideNavButton side={"right"}> Stats </SideNavButton>
                    <SideNavButton side={"right"}> Settings </SideNavButton>
                </div>
            </div>

            {/* Bottom Tab Bar */}
            <div className="bottom-bar">
                <button className="tab-button">Tab 1</button>
                <button className="tab-button">Tab 2</button>
            </div>

        </div>
    );
}
