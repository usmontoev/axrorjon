import { motion } from "framer-motion";

export default function HeroSVG() {
  return (
    <motion.svg
      className="heroSvg"
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.4, ease: "easeOut" }}
    >
      {/* FLOATING LINES */}
      <motion.line
        x1="40"
        y1="60"
        x2="360"
        y2="60"
        stroke="white"
        strokeOpacity="0.25"
        strokeWidth="1"
        animate={{
          y1: [60, 66, 58, 60],
          y2: [60, 66, 58, 60],
          opacity: [0.15, 0.35, 0.2, 0.3],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.line
        x1="60"
        y1="160"
        x2="340"
        y2="160"
        stroke="white"
        strokeOpacity="0.2"
        strokeWidth="1"
        animate={{
          y1: [160, 148, 165, 160],
          y2: [160, 148, 165, 160],
          opacity: [0.1, 0.3, 0.18, 0.25],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* WANDERING NODES */}
      <motion.circle
        r="4.5"
        fill="white"
        initial={{ cx: 90, cy: 60 }}
        animate={{
          cx: [90, 140, 120, 180, 90],
          cy: [60, 90, 70, 110, 60],
          opacity: [0.3, 0.9, 0.4, 0.8, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.circle
        r="5.5"
        fill="white"
        initial={{ cx: 260, cy: 150 }}
        animate={{
          cx: [260, 220, 280, 240, 260],
          cy: [150, 180, 160, 200, 150],
          opacity: [0.25, 0.85, 0.35, 0.7, 0.25],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.circle
        r="3.5"
        fill="white"
        initial={{ cx: 180, cy: 230 }}
        animate={{
          cx: [180, 210, 160, 200, 180],
          cy: [230, 200, 260, 220, 230],
          opacity: [0.2, 0.6, 0.3, 0.55, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.svg>
  );
}
