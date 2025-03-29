import React, {Component} from "react";
import "./gameScreen.css"

export default class GameScreen extends Component{
    render() {
        return (
            <div className="game-screen">
                <div className="score-area">

                </div>
                <div className="line" />
                <div className="resource-area">

                </div>
            </div>
        )
    }
}