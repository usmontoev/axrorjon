import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  FaRobot,
  FaLightbulb,
  FaCode,
  FaMobileAlt,
  FaBolt,
} from "react-icons/fa";
import { useLang } from "../i18n/LanguageContext";

/* ── quality icons (order matches translations.qualities) ── */
const qualityIcons = [
  <FaRobot />,
  <FaLightbulb />,
  <FaCode />,
  <FaMobileAlt />,
  <FaBolt />,
];

/* ── 3D mouse-tracking tilt wrapper ── */
function TiltCard({ children, className }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-60, 60], [12, -12]), {
    stiffness: 260,
    damping: 28,
  });
  const rotateY = useSpring(useTransform(mx, [-60, 60], [-12, 12]), {
    stiffness: 260,
    damping: 28,
  });

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {/* inner layer shifted in Z for depth effect */}
      <div className="about__cardInner">{children}</div>
    </motion.div>
  );
}

/* ── animations ── */
const fadeLeft = {
  hidden: { opacity: 0, scale: 0.82, filter: "blur(18px)", x: -20 },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", x: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, scale: 0.8, filter: "blur(14px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const cardReveal = {
  hidden: { opacity: 0, scale: 0.72, filter: "blur(20px)" },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { delay: i * 0.13, duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  }),
};

/* ── component ── */
export default function About() {
  const { t } = useLang();

  return (
    <section className="about" id="about">
      <div className="about__container">

        {/* ── TOP ROW ── */}
        <div className="about__top">

          {/* LEFT — text + floating code card */}
          <motion.div
            className="about__text"
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            <h2 className="about__title">{t.about.title}</h2>
            <p className="about__description">{t.about.p1}</p>
            <p className="about__description">{t.about.p2}</p>

            {/* 3D floating code card */}
            <div className="about__codeWrap">
              <div className="about__codeCard">
                <div className="about__codeDots">
                  <span /><span /><span />
                </div>
                <pre className="about__codePre">
                  <span className="c-bracket">{"{"}</span>{"\n"}
                  {"  "}<span className="c-key">name</span>
                  <span className="c-colon">{": "}</span>
                  <span className="c-str">"Ulug'bek"</span><span className="c-comma">,</span>{"\n"}
                  {"  "}<span className="c-key">role</span>
                  <span className="c-colon">{": "}</span>
                  <span className="c-str">"Front-end Dev"</span><span className="c-comma">,</span>{"\n"}
                  {"  "}<span className="c-key">exp</span>
                  <span className="c-colon">{": "}</span>
                  <span className="c-num">"1+ year"</span><span className="c-comma">,</span>{"\n"}
                  {"  "}<span className="c-key">ai</span>
                  <span className="c-colon">{": "}</span>
                  <span className="c-bracket">{"["}</span>
                  <span className="c-str">"Claude"</span>
                  <span className="c-comma">, </span>
                  <span className="c-str">"ChatGPT"</span>
                  <span className="c-bracket">{"]"}</span><span className="c-comma">,</span>{"\n"}
                  <span className="c-bracket">{"}"}</span>
                </pre>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — 3D tilt cards */}
          <motion.div
            className="about__cards"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
          >
            {t.about.cards.map((item, i) => (
              <motion.div key={i} custom={i} variants={cardReveal}>
                <TiltCard className="about__card">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── BOTTOM ROW — qualities ── */}
        <motion.div
          className="about__qualities"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {t.about.qualities.map((q, i) => (
            <motion.div
              key={i}
              className="about__qualItem"
              variants={fadeUp}
              whileHover={{ y: -5, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
            >
              <span className="about__qualIcon">{qualityIcons[i]}</span>
              <div className="about__qualText">
                <h4 className="about__qualTitle">{q.title}</h4>
                <p className="about__qualDesc">{q.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
