import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../i18n/LanguageContext";

export default function NavSidebar({ current, sections, onNavigate }) {
  const [hovered, setHovered] = useState(false);
  const { t } = useLang();

  const navItems = [
    { id: "home",     label: t.nav.home },
    { id: "about",    label: t.nav.about },
    { id: "skills",   label: t.nav.skills },
    { id: "projects", label: t.nav.projects },
    { id: "contact",  label: t.nav.contact },
  ];

  return (
    <div
      className="nav-sidebar"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* dots — always visible */}
      <div className="nav-sidebar__dots">
        {sections.map((s, i) => (
          <button
            key={s.id}
            className={`nav-sidebar__dot${i === current ? " active" : ""}`}
            onClick={() => onNavigate(s.id)}
            title={s.id}
          />
        ))}
      </div>

      {/* nav panel — slides in on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="nav-sidebar__panel"
            initial={{ opacity: 0, x: -16, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="nav-sidebar__brand">UN</p>
            <div className="nav-sidebar__sep" />
            {navItems.map((item, i) => {
              const idx = sections.findIndex((s) => s.id === item.id);
              return (
                <motion.button
                  key={item.id}
                  className={`nav-sidebar__item${idx === current ? " active" : ""}`}
                  onClick={() => onNavigate(item.id)}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.045, duration: 0.22 }}
                  whileHover={{ x: 5 }}
                >
                  {item.label}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
