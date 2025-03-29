import React from "react";
import {Component} from "react";

export default class UpgradeButton extends Component {
    render() {
        return (
            <button className="upgrade-button">
                {this.props.children}
            </button>
        )
    }
}