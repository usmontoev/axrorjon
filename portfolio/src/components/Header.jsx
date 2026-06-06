import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { TbWorld } from "react-icons/tb";
import { useLang } from "../i18n/LanguageContext";

function LangToggle({ instanceId, className = "" }) {
  const { lang, setLang } = useLang();
  return (
    <div className={`lang__toggle ${className}`}>
      <TbWorld className="lang__globe" />
      {["en", "uz"].map((l) => (
        <button
          key={l}
          className={`lang__btn${lang === l ? " active" : ""}`}
          onClick={() => setLang(l)}
        >
          {lang === l && (
            <motion.span
              className="lang__pill"
              layoutId={instanceId}
              transition={{ type: "spring", stiffness: 420, damping: 30 }}
            />
          )}
          <span className="lang__label">{l.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
}

export default function Header({ currentId = "home", onNavigate = () => {} }) {
  const [open, setOpen] = useState(false);
  const { t } = useLang();

  const navLinks = [
    { id: "home",     label: t.nav.home },
    { id: "about",    label: t.nav.about },
    { id: "skills",   label: t.nav.skills },
    { id: "projects", label: t.nav.projects },
    { id: "contact",  label: t.nav.contact },
  ];

  const handleNav = (id) => {
    onNavigate(id);
    setOpen(false);
  };

  return (
    <>
      {/* Hamburger — mobile only */}
      <motion.button
        className={`burger${open ? " burger--open" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <motion.span
          className="burger__bar"
          animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
        />
        <motion.span
          className="burger__bar"
          animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.22 }}
        />
        <motion.span
          className="burger__bar"
          animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
        />
      </motion.button>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobileMenu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* close button */}
            <motion.button
              className="mobileMenu__close"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <FiX />
            </motion.button>

            {/* nav links */}
            <nav className="mobileMenu__nav">
              {navLinks.map(({ id, label }, i) => (
                <motion.a
                  key={id}
                  className={`mobileMenu__link${currentId === id ? " active" : ""}`}
                  onClick={() => handleNav(id)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: 0.05 + i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="mobileMenu__num">{String(i + 1).padStart(2, "0")}</span>
                  {label}
                </motion.a>
              ))}
            </nav>

            {/* lang toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.35 }}
            >
              <LangToggle instanceId="langPill-menu" className="lang__toggle--mobile" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
