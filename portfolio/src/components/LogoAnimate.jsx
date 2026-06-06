import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LETTERS = ["A", "h", "r", "o", "r", "j", "o", "n"];

function UNMark() {
  return (
    <svg
      className="la-svg"
      viewBox="0 0 54 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* U — rounded bottom */}
      <path
        className="la-path la-path--u"
        d="M3 3 L3 22 Q3 33 12 33 Q21 33 21 22 L21 3"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* N — two verticals + diagonal */}
      <path
        className="la-path la-path--n"
        d="M28 3 L28 33 L46 3 L46 33"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function LogoAnimate() {
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowLogo(true), 820);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="logoAnim">
      <AnimatePresence mode="wait">

        {!showLogo && (
          <motion.div
            key="text"
            className="logoAnim__word"
            exit={{
              opacity: 0,
              scale: 0.85,
              filter: "blur(12px)",
              transition: { duration: 0.22, ease: "easeIn" },
            }}
          >
            {LETTERS.map((ch, i) => (
              <motion.span
                key={i}
                className="logoAnim__letter"
                initial={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
                transition={{
                  delay: 0.04 + i * 0.036,
                  duration: 0.3,
                  ease: "easeOut",
                }}
              >
                {ch}
              </motion.span>
            ))}
          </motion.div>
        )}

        {showLogo && (
          <motion.div
            key="logo"
            className="logoAnim__mark"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <UNMark />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
