import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { FaTelegramPlane, FaPhoneAlt, FaInstagram, FaGitlab } from "react-icons/fa";
import { FiExternalLink, FiCopy, FiCheck } from "react-icons/fi";
import { useLang } from "../i18n/LanguageContext";

/* ── 3D tilt card ── */
function TiltCard({ children, className, onClick, href, target, rel }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-50, 50], [10, -10]), { stiffness: 280, damping: 26 });
  const rotateY = useSpring(useTransform(mx, [-50, 50], [-10, 10]), { stiffness: 280, damping: 26 });

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(e.clientX - r.left - r.width / 2);
    my.set(e.clientY - r.top - r.height / 2);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  const Tag = href ? motion.a : motion.div;
  const linkProps = href ? { href, target, rel } : {};

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      {...linkProps}
    >
      <div style={{ transform: "translateZ(14px)" }}>{children}</div>
    </Tag>
  );
}

/* ── stagger variants ── */
const grid = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fromLeft  = { hidden: { opacity: 0, scale: 0.76, filter: "blur(18px)", rotateY: -8 }, visible: { opacity: 1, scale: 1, filter: "blur(0px)", rotateY: 0, transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] } } };
const fromRight = { hidden: { opacity: 0, scale: 0.76, filter: "blur(18px)", rotateY:  8 }, visible: { opacity: 1, scale: 1, filter: "blur(0px)", rotateY: 0, transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] } } };
const fromBelow = { hidden: { opacity: 0, scale: 0.8,  filter: "blur(14px)" },              visible: { opacity: 1, scale: 1, filter: "blur(0px)",             transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } } };

const cardVariants = [fromLeft, fromRight, fromLeft, fromRight];

/* ── main component ── */
export default function Contact() {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("+998935422005");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cards = [
    {
      icon: <FaGitlab />,
      label: t.contact.labels.gitlab,
      value: "ulugb3kjon",
      href: "https://gitlab.com/ulugb3kjon",
      target: "_blank",
      rel: "noreferrer",
      action: <FiExternalLink />,
    },
    {
      icon: <FaTelegramPlane />,
      label: t.contact.labels.telegram,
      value: "@Ulugbek_devv",
      href: "https://t.me/Ulugbek_devv",
      target: "_blank",
      rel: "noreferrer",
      action: <FiExternalLink />,
    },
    {
      icon: <FaPhoneAlt />,
      label: t.contact.labels.phone,
      value: "+998 93 542 20 05",
      isCopy: true,
      action: copied ? <FiCheck /> : <FiCopy />,
    },
    {
      icon: <FaInstagram />,
      label: t.contact.labels.instagram,
      value: "@Ulugbek_devv",
      href: "https://instagram.com/Ulugbek_devv",
      target: "_blank",
      rel: "noreferrer",
      action: <FiExternalLink />,
    },
  ];

  return (
    <section className="contact" id="contact">
      {/* animated background orbs */}
      <div className="contact__bg">
        <div className="contact__orb contact__orb--1" />
        <div className="contact__orb contact__orb--2" />
        <div className="contact__orb contact__orb--3" />
      </div>

      <div className="contact__inner">
        {/* header */}
        <motion.div
          className="contact__header"
          initial={{ opacity: 0, scale: 0.82, filter: "blur(18px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* availability badge */}
          <motion.div
            className="contact__badge"
            initial={{ opacity: 0, scale: 0.6, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: false }}
            transition={{ delay: 0.15, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="contact__badgeDot" />
            {t.contact.available}
          </motion.div>

          <h2 className="contact__title">{t.contact.title}</h2>
          <p className="contact__subtitle">{t.contact.subtitle}</p>
        </motion.div>

        {/* cards grid */}
        <motion.div
          className="contact__grid"
          variants={grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {cards.map((card, i) => (
            <motion.div key={i} variants={cardVariants[i]}>
              <TiltCard
                className={`contact__card${card.isCopy ? " contact__card--copy" : ""}${copied && card.isCopy ? " contact__card--copied" : ""}`}
                href={card.href}
                target={card.target}
                rel={card.rel}
                onClick={card.isCopy ? handleCopy : undefined}
              >
                <span className="contact__cardIcon">{card.icon}</span>
                <div className="contact__cardInfo">
                  <span className="contact__cardLabel">{card.label}</span>
                  <span className="contact__cardValue">{card.value}</span>
                </div>
                <span className={`contact__cardAction${copied && card.isCopy ? " contact__cardAction--done" : ""}`}>
                  {card.action}
                </span>

                {/* copy flash overlay */}
                <AnimatePresence>
                  {copied && card.isCopy && (
                    <motion.span
                      className="contact__copyFlash"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <FiCheck /> {t.contact.copied}
                    </motion.span>
                  )}
                </AnimatePresence>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
