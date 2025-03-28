import { useState } from "react";
import { motion } from "framer-motion";

export default function SlidingPanel() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            animate={{ x: isOpen ? "-10%" : "-97%" }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            className="sliding-panel"
        >
            <div className="sliding-panel-flexbox">

            </div>
        </motion.div>
    );
}
