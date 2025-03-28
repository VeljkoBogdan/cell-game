import React from "react";
import {Component} from "react";

class UpgradeButton extends Component {
    render() {
        return (
            <button className="upgrade-button">
                {this.props.children}
            </button>
        );
    }
}

export default UpgradeButton