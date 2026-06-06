import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { FaGitlab, FaTelegramPlane, FaInstagram, FaPhoneAlt } from "react-icons/fa";
import HeroSVG from "../components/HeroSVG";
import { useLang } from "../i18n/LanguageContext";

const CubeScene = lazy(() => import("../cavans/CubeScene"));

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const revealUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.8, 0.25, 1] } },
};

export default function Home() {
  const { t } = useLang();
  const [projects, setProjects] = useState(0);
  const [years, setYears] = useState(0);
  const [responsive, setResponsive] = useState(0);
  const intervalsRef = useRef([]);

  useEffect(() => {
    return () => {
      intervalsRef.current.forEach(clearInterval);
      intervalsRef.current = [];
    };
  }, []);

  const animateCount = (setter, end, duration) => {
    let start = 0;
    const stepTime = duration / end;
    const counter = setInterval(() => {
      start += 1;
      setter(start);
      if (start >= end) clearInterval(counter);
    }, stepTime);
    intervalsRef.current.push(counter);
  };

  const startCounter = () => {
    intervalsRef.current.forEach(clearInterval);
    intervalsRef.current = [];
    setProjects(0);
    setYears(0);
    setResponsive(0);
    animateCount(setProjects, 15, 2200);
    animateCount(setYears, 2, 1200);
    animateCount(setResponsive, 100, 2500);
  };

  const icons = [
    { icon: <FaGitlab />,        link: "https://gitlab.com/ulugb3kjon" },
    { icon: <FaTelegramPlane />, link: "https://t.me/Ulugbek_devv" },
    { icon: <FaInstagram />,     link: "https://instagram.com/Ulugbek_devv" },
    { icon: <FaPhoneAlt />,      link: "tel:+998935422005" },
  ];

  return (
    <section className="home" id="home">
      <motion.div
        className="home__container"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* LEFT */}
        <div className="home__left">
          <motion.div className="home__icons" variants={revealUp}>
            {icons.map((item, i) => (
              <motion.a
                key={i}
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="home__icon"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                whileHover={{ rotateY: 360, scale: 1.15, boxShadow: "0 0 24px rgba(255,255,255,0.25)" }}
                style={{ transformStyle: "preserve-3d", perspective: 400 }}
              >
                <motion.span
                  whileHover={{ rotateY: 360 }}
                  transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                  style={{ display: "flex" }}
                >
                  {item.icon}
                </motion.span>
              </motion.a>
            ))}
          </motion.div>

          <div className="home__content">
            <motion.div className="home__titleRow" variants={revealUp}>
              <h1 className="home__title">
                {t.home.greetingPrefix} Ulug<span className="gold">'</span>bek
              </h1>
              <div className="home__miniCube">
                <Suspense fallback={null}>
                  <CubeScene />
                </Suspense>
                <div className="home__cubeShadow" />
              </div>
            </motion.div>

            <motion.p className="home__subtitle" variants={revealUp}>
              {t.home.subtitle1} <br />
              {t.home.subtitle2}
            </motion.p>

            <motion.div
              className="home__stats"
              variants={revealUp}
              whileInView="visible"
              initial="hidden"
              viewport={{ amount: 0.4, once: false }}
              onViewportEnter={startCounter}
            >
              <div className="home__statItem">
                <h2>{years}+</h2>
                <p>{t.home.stats.monthsLabel}</p>
              </div>
              <div className="home__statItem">
                <h2>{projects}+</h2>
                <p>{t.home.stats.projectsLabel}</p>
              </div>
              <div className="home__statItem">
                <h2>{responsive}%</h2>
                <p>{t.home.stats.responsiveLabel}</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* RIGHT */}
        <motion.div className="home__svg" variants={revealUp}>
          <HeroSVG />
        </motion.div>
      </motion.div>
    </section>
  );
}
