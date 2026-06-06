import { useState, useEffect } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollHome = () => {
    animate(window.scrollY, 0, {
      duration: 1.2,
      ease: "easeInOut",
      onUpdate: (v) => window.scrollTo(0, v),
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className="scrollTop__btn"
          onClick={scrollHome}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0,  scale: 1 }}
          exit={{    opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
          whileHover={{ scale: 1.12, y: -3 }}
          whileTap={{ scale: 0.93 }}
          aria-label="Scroll to top"
        >
          <FiArrowUp className="scrollTop__icon" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
