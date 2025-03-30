import { Tooltip } from "./Tooltip";

export const ProgressBar = ({ value, max }) => {
    return (
        <Tooltip text={`${value.toFixed(2)} / ${max.toFixed(2)}`}>
            <div
                className={"progress-bar"}
                style={{
                    width: "100%",
                    height: "20px",
                    overflow: "hidden",
                    position: "relative",
                    cursor: "pointer",
                    marginBottom: "8px"
                }}
            >
                <div
                    className={"progress-bar-bg"}
                    style={{
                        width: `${(value / max) * 100}%`,
                        height: "100%",
                        transition: "width 0.3s ease-in-out"
                    }}
                ></div>
            </div>
        </Tooltip>
    );
};
