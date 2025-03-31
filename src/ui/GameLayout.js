import "./gameLayout.css";
import React, {useEffect, useState} from "react";
import SideNavButton from "./SideNavButton";
import GameScreen from "./GameScreen";
import {startGameLoop} from "../core/GameState";

export default function GameLayout() {
    const [viewMode, setViewMode] = useState("main");

    useEffect(() => {
        // GAME START
        startGameLoop()


    }, []);

    return (
        <div className="game-container">
            <div className="main-content">

                {/* Left Navigation */}
                <div className="side-nav left-nav">
                    <SideNavButton side={"left"} onClick={() => setViewMode("main")}> Main </SideNavButton>
                    <SideNavButton side={"left"} onClick={() => setViewMode("upgrades")}> Organelles </SideNavButton>
                    { <SideNavButton side={"left"} onClick={() => setViewMode("nucleus")}> Nucleus </SideNavButton> }
                </div>

                {/* Game Screen */}
                <GameScreen viewMode={viewMode} />

                {/* Right Navigation */}
                <div className="side-nav right-nav">
                    <SideNavButton side={"right"} onClick={() => setViewMode("stats")}> Stats </SideNavButton>
                    <SideNavButton side={"right"} onClick={() => setViewMode("settings")}> Settings </SideNavButton>
                </div>
            </div>

            {/* Bottom Tab Bar */}
            <div className="bottom-bar">
                <button className="tab-button">Cell</button>
            </div>

        </div>
    );
}
