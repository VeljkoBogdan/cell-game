import React from "react";
import {ProgressBar} from "./Components/ProgressBar";

export default function MainFragment({ resources }) {

    return (
        <div className={"replication-progress-area"}>
            <p className={"header-text"}> Resources to replicate cell: </p>
            <span className={"energy-text"}> Energy </span> <ProgressBar value={resources.energy} max={resources.requirementsForReplication.energy} />
            <span className={"nutrients-text"}> Nutrients </span> <ProgressBar value={resources.nutrients} max={resources.requirementsForReplication.nutrients} />
            <span className={"water-text"}> Water </span> <ProgressBar value={resources.water} max={resources.requirementsForReplication.water} />
            <span className={"oxygen-text"}> Oxygen </span> <ProgressBar value={resources.oxygen} max={resources.requirementsForReplication.oxygen} />
        </div>
    )
}