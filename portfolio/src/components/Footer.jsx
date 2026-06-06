import { motion } from "framer-motion";
import {
  FaGitlab, FaTelegramPlane, FaInstagram, FaTiktok, FaPhoneAlt,
  FaGithub,
} from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { useLang } from "../i18n/LanguageContext";

const socials = [
  { icon: <FaGithub />,        href: "https://gitlab.com/ulugb3kjon",      label: "GitHub" },
  { icon: <FaTelegramPlane />, href: "https://t.me/usmontoev",          label: "Telegram" },
  { icon: <FaInstagram />,     href: "https://instagram.com/usmontoev", label: "Instagram" },
  { icon: <FaTiktok />,        href: "https://tiktok.com/@usmontoev",   label: "TikTok" },
  { icon: <FaPhoneAlt />,      href: "tel:+998901234567",                   label: "Phone" },
];

const navIds = ["home", "about", "skills", "projects", "contact"];

const navigate = (id) =>
  window.dispatchEvent(new CustomEvent("portfolioNavigate", { detail: { id } }));

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp  = {
  hidden:  { opacity: 0, scale: 0.85, filter: "blur(12px)" },
  visible: { opacity: 1, scale: 1,    filter: "blur(0px)",  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};
const fadeLeft  = { hidden: { opacity: 0, x: -24 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } };
const fadeRight = { hidden: { opacity: 0, x:  24 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } };

export default function Footer() {
  const { t } = useLang();
  const navLabels = [t.nav.home, t.nav.about, t.nav.skills, t.nav.projects, t.nav.contact];

  return (
    <footer className="footer">
      {/* background orbs */}
      <div className="footer__bg">
        <div className="footer__orb footer__orb--1" />
        <div className="footer__orb footer__orb--2" />
        <div className="footer__orb footer__orb--3" />
      </div>

      {/* orange top line */}
      <motion.div
        className="footer__topLine"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="footer__container">

        {/* ── BIG CTA ── */}
        <motion.div
          className="footer__cta"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
          variants={stagger}
        >
          <motion.div className="footer__ctaBadge" variants={fadeUp}>
            <span className="footer__ctaDot" />
            {t.contact.available}
          </motion.div>

          <motion.h2 className="footer__ctaTitle" variants={fadeUp}>
            {t.footer.cta ?? "Let's build something"}{" "}
            <span className="gold">{t.footer.ctaAccent ?? "amazing"}</span>
          </motion.h2>

          <motion.p className="footer__ctaSub" variants={fadeUp}>
            {t.footer.ctaSub ?? "Open to frontend roles & freelance projects"}
          </motion.p>

          <motion.div className="footer__ctaActions" variants={fadeUp}>
            <a
              href="https://t.me/usmontoev"
              target="_blank"
              rel="noreferrer"
              className="footer__ctaBtn footer__ctaBtn--primary"
            >
              Get in touch <FiArrowUpRight />
            </a>
            <a
              href="https://github.com/usmontoev"
              target="_blank"
              rel="noreferrer"
              className="footer__ctaBtn footer__ctaBtn--secondary"
            >
              View work <FiArrowUpRight />
            </a>
          </motion.div>
        </motion.div>

        {/* divider */}
        <motion.div
          className="footer__midLine"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* ── MAIN ROW ── */}
        <div className="footer__top">

          {/* LEFT */}
          <motion.div
            className="footer__left"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            {/* brand */}
            <motion.div className="footer__brand" variants={fadeLeft}>
              <svg className="footer__svg" viewBox="0 0 54 36" fill="none">
                <path d="M3 3 L3 22 Q3 33 12 33 Q21 33 21 22 L21 3"
                  stroke="white" strokeWidth="2.4" strokeLinecap="round" />
                <path d="M28 3 L28 33 L46 3 L46 33"
                  stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="footer__brandText">
                <span className="footer__brandName">Usmontoev Ahrorjon</span>
                <span className="footer__brandRole">Full-Stack Developer</span>
              </div>
            </motion.div>

            <motion.div className="footer__brandLine" variants={fadeLeft} />

            {/* location + email */}
            <motion.div className="footer__info" variants={fadeLeft}>
              <span>📍 Tashkent, Uzbekistan</span>
              <span>✉️ usmontoyev07@gmail.com</span>
              <span>💼 Available for work</span>
            </motion.div>

            {/* social icons */}
            <motion.div className="footer__socials" variants={stagger}>
              {socials.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  target={s.href.startsWith("tel") ? undefined : "_blank"}
                  rel={s.href.startsWith("tel") ? undefined : "noreferrer"}
                  aria-label={s.label}
                  className="footer__socialIcon"
                  variants={fadeUp}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2.8 + i * 0.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                  whileHover={{ scale: 1.25, rotateY: 360, transition: { duration: 0.45 } }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* CENTER — tech stack */}
          <motion.div
            className="footer__tech"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            <motion.p className="footer__navTitle" variants={fadeUp}>Tech Stack</motion.p>
            {["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"].map((tech) => (
              <motion.span key={tech} className="footer__techTag" variants={fadeUp}
                whileHover={{ scale: 1.06, borderColor: "var(--accent-glow)", color: "var(--accent)" }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          {/* RIGHT — nav links */}
          <motion.nav
            className="footer__nav"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            <motion.p className="footer__navTitle" variants={fadeRight}>Navigation</motion.p>
            {navIds.map((id, i) => (
              <motion.a
                key={id}
                className="footer__navLink"
                onClick={() => navigate(id)}
                variants={fadeRight}
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <span className="footer__navDot" />
                {navLabels[i]}
              </motion.a>
            ))}
          </motion.nav>
        </div>

        {/* ── BOTTOM ── */}
        <motion.div
          className="footer__bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="footer__bottomLine" />
          <div className="footer__bottomRow">
            <p className="footer__copy">{t.footer.copy}</p>
            <p className="footer__made">Made with React & Framer Motion</p>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}
