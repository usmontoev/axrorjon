import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import NavSidebar from "./components/NavSidebar";
import Home from "./sections/home";

const About    = lazy(() => import("./sections/About"));
const Skills   = lazy(() => import("./sections/Skills"));
const Projects = lazy(() => import("./sections/Projects"));
const Contact  = lazy(() => import("./sections/Contact"));
const Footer   = lazy(() => import("./components/Footer"));

const SECTIONS = [
  { id: "home",     Component: Home     },
  { id: "about",    Component: About    },
  { id: "skills",   Component: Skills   },
  { id: "projects", Component: Projects },
  { id: "contact",  Component: Contact  },
  { id: "footer",   Component: Footer   },
];

// Gentle camera reveal — door panels carry the visual transition
const sectionVariants = {
  enter: (dir) => ({
    opacity: 0,
    scale: 0.97,
    filter: "blur(5px)",
    x: dir > 0 ? 18 : -18,
  }),
  center: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    x: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.12 },
  },
  exit: (dir) => ({
    opacity: 0,
    scale: 1.01,
    filter: "blur(3px)",
    x: dir > 0 ? -12 : 12,
    transition: { duration: 0.14 },
  }),
};

export default function App() {
  const [current,    setCurrent]    = useState(0);
  const [dir,        setDir]        = useState(1);
  const [doorClosed, setDoorClosed] = useState(false);
  const panelRef = useRef(null);
  const stateRef = useRef({ busy: false });

  const triggerNav = (nextIdx, direction) => {
    stateRef.current.busy = true;
    setDir(direction);

    // Phase 1 — doors slam shut (420ms)
    setDoorClosed(true);

    setTimeout(() => {
      // Phase 2 — swap section behind closed doors
      setCurrent(nextIdx);

      setTimeout(() => {
        // Phase 3 — doors glide open (650ms)
        setDoorClosed(false);

        setTimeout(() => {
          stateRef.current.busy = false;
        }, 700);
      }, 55);
    }, 430);
  };

  const navigate = (delta) => {
    if (stateRef.current.busy) return;
    const next = current + delta;
    if (next < 0 || next >= SECTIONS.length) return;
    triggerNav(next, delta);
  };
  stateRef.current.navigate = navigate;

  const goToId = (id) => {
    if (stateRef.current.busy) return;
    const idx = SECTIONS.findIndex((s) => s.id === id);
    if (idx < 0 || idx === current) return;
    triggerNav(idx, idx > current ? 1 : -1);
  };
  stateRef.current.goToId = goToId;

  /* wheel scroll */
  useEffect(() => {
    const handler = (e) => {
      if (stateRef.current.busy) return;
      const panel = panelRef.current;
      if (!panel) {
        if (Math.abs(e.deltaY) > 35) { e.preventDefault(); stateRef.current.navigate(e.deltaY > 0 ? 1 : -1); }
        return;
      }
      const atBottom = panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 10;
      const atTop    = panel.scrollTop <= 10;
      if      (e.deltaY > 35  && atBottom) { e.preventDefault(); stateRef.current.navigate(1);  }
      else if (e.deltaY < -35 && atTop)    { e.preventDefault(); stateRef.current.navigate(-1); }
    };
    document.addEventListener("wheel", handler, { passive: false });
    return () => document.removeEventListener("wheel", handler);
  }, []);

  /* keyboard */
  useEffect(() => {
    const handler = (e) => {
      if (["ArrowDown", "PageDown"].includes(e.key)) stateRef.current.navigate(1);
      if (["ArrowUp",   "PageUp"  ].includes(e.key)) stateRef.current.navigate(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  /* footer nav custom event */
  useEffect(() => {
    const handler = (e) => stateRef.current.goToId?.(e.detail?.id);
    window.addEventListener("portfolioNavigate", handler);
    return () => window.removeEventListener("portfolioNavigate", handler);
  }, []);

  /* touch */
  const touchY = useRef(null);
  const onTouchStart = (e) => { touchY.current = e.touches[0].clientY; };
  const onTouchEnd   = (e) => {
    if (touchY.current === null) return;
    const diff = touchY.current - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 55) stateRef.current.navigate(diff > 0 ? 1 : -1);
    touchY.current = null;
  };

  const { Component: CurrentSection } = SECTIONS[current];

  return (
    <div className="app-scene" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <Header currentId={SECTIONS[current].id} onNavigate={goToId} />
      <NavSidebar current={current} sections={SECTIONS} onNavigate={goToId} />

      <div className="depth-stage">
        <AnimatePresence initial={false} custom={dir} mode="wait">
          <motion.div
            key={current}
            ref={panelRef}
            className="depth-panel"
            custom={dir}
            variants={sectionVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <Suspense fallback={<div style={{ height: "100vh", background: "#000" }} />}>
              <CurrentSection />
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Door transition panels — split left/right on every navigation */}
      <motion.div
        className="door-panel door-panel--left"
        initial={false}
        animate={{ x: doorClosed ? "0%" : "-101%" }}
        transition={{
          duration: doorClosed ? 0.42 : 0.65,
          ease:     doorClosed ? [0.76, 0, 0.24, 1] : [0.16, 1, 0.3, 1],
        }}
      />
      <motion.div
        className="door-panel door-panel--right"
        initial={false}
        animate={{ x: doorClosed ? "0%" : "101%" }}
        transition={{
          duration: doorClosed ? 0.42 : 0.65,
          ease:     doorClosed ? [0.76, 0, 0.24, 1] : [0.16, 1, 0.3, 1],
        }}
      />

      {current < SECTIONS.length - 1 && (
        <motion.div
          className="depth-hint"
          key={`hint-${current}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, delay: 2 }}
        >
          <span>SCROLL</span>
          <motion.svg width="13" height="16" viewBox="0 0 13 16" fill="none"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            <path d="M6.5 0v10M1 7l5.5 7 5.5-7"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </motion.svg>
        </motion.div>
      )}
    </div>
  );
}
