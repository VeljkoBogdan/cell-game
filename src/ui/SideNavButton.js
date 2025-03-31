import React, {Component} from "react";

export default class SideNavButton extends Component {
    render() {
        return (
            <button
                className={"nav-button " + (this.props.side === "left" ? "nav-button-left" : "nav-button-right")}
                onClick={this.props.onClick}
            >
                {this.props.children}
            </button>
        )
    }
}