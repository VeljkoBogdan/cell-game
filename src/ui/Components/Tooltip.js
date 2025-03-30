import { useState } from "react";

export const Tooltip = ({ text, children }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            style={{ position: "relative", display: "block" }} // <-- Block allows flex stacking
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}

            {isHovered && (
                <div
                    className={"tooltip"}
                    style={{
                        top: "-110%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        whiteSpace: "nowrap",
                    }}
                >
                    {text}
                </div>
            )}
        </div>
    );
};
