import { motion } from "framer-motion";
import {
  FaGitlab, FaJs, FaReact, FaCss3Alt,
} from "react-icons/fa";
import {
  SiNextdotjs, SiTailwindcss, SiRedux, SiMui, SiAntdesign, SiTypescript,
  SiVscodium, SiFigma, SiPostgresql, SiGraphql, SiNodedotjs, SiDocker,
} from "react-icons/si";
import { useLang } from "../i18n/LanguageContext";

/* ── Marquee data ── */
const marqueeSkills = [
  { icon: <FaGitlab />,     name: "GitLab" },
  { icon: <FaJs />,         name: "JavaScript" },
  { icon: <SiTypescript />, name: "TypeScript" },
  { icon: <FaReact />,      name: "React" },
  { icon: <SiNextdotjs />,  name: "Next.js" },
  { icon: <SiRedux />,      name: "Redux" },
  { icon: <FaCss3Alt />,    name: "CSS" },
  { icon: <SiTailwindcss />,name: "Tailwind" },
  { icon: <SiMui />,        name: "Material UI" },
  { icon: <SiAntdesign />,  name: "Ant Design" },
];

/* ── Category data ── */
const categories = [
  {
    skills: [
      { icon: <FaJs />,         name: "JavaScript" },
      { icon: <SiTypescript />, name: "TypeScript" },
      { icon: <FaReact />,      name: "React" },
      { icon: <SiNextdotjs />,  name: "Next.js" },
      { icon: <SiRedux />,      name: "Redux" },
    ],
  },
  {
    skills: [
      { icon: <FaGitlab />,           name: "GitLab" },
      { icon: <SiVscodium />,         name: "VS Code" },
      { icon: <SiFigma />,            name: "Figma" },
    ],
  },
  {
    skills: [
      { icon: <FaCss3Alt />,     name: "CSS" },
      { icon: <SiTailwindcss />, name: "Tailwind" },
      { icon: <SiMui />,         name: "Material UI" },
      { icon: <SiAntdesign />,   name: "Ant Design" },
    ],
  },
];

/* ── Currently learning ── */
const learning = [
  { icon: <SiNodedotjs />,   name: "Node.js" },
  { icon: <SiPostgresql />,  name: "PostgreSQL" },
  { icon: <SiDocker />,      name: "Docker" },
  { icon: <SiGraphql />,     name: "GraphQL" },
];

/* ── Animations ── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, scale: 0.78, filter: "blur(16px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const fadeIn = {
  hidden: { opacity: 0, scale: 0.65, filter: "blur(14px)" },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

/* ── Marquee row component ── */
function InfiniteRow({ direction = "left" }) {
  return (
    <div className="skills__wrapper">
      <div className={`skills__track skills__track--${direction}`}>
        {marqueeSkills.concat(marqueeSkills).map((skill, i) => (
          <div key={i} className="skills__item">
            {skill.icon}
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main component ── */
export default function Skills() {
  const { t } = useLang();

  return (
    <section className="skills" id="skills">
      <div className="skills__container">
        <motion.h2
          className="skills__title"
          initial={{ opacity: 0, scale: 0.78, filter: "blur(18px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {t.skills.title}
        </motion.h2>

        {/* MARQUEE */}
        <div className="skills__desktop">
          <InfiniteRow direction="left" />
        </div>
        <div className="skills__mobile">
          <InfiniteRow direction="left" />
          <InfiniteRow direction="right" />
        </div>

        {/* DIVIDER */}
        <div className="skills__divider" />

        {/* CATEGORIES */}
        <motion.div
          className="skills__categories"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {categories.map((cat, ci) => (
            <motion.div
              key={ci}
              className="skills__catCard"
              variants={fadeUp}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <h4 className="skills__catTitle">{t.skills.catTitles[ci]}</h4>

              <div className="skills__catList">
                {cat.skills.map((s, si) => (
                  <div key={si} className="skills__catItem">
                    <span className="skills__catIcon">{s.icon}</span>
                    <span className="skills__catName">{s.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CURRENTLY LEARNING */}
        <div className="skills__learning">
          <motion.p
            className="skills__learningTitle"
            initial={{ opacity: 0, scale: 0.8, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: false }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            {t.skills.learningTitle}
          </motion.p>

          <div className="skills__learningBadges">
            {learning.map((item, i) => (
              <motion.div
                key={i}
                className="skills__learningBadge"
                custom={i}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                whileHover={{ scale: 1.07 }}
              >
                <span className="skills__learningDot" />
                <span className="skills__learningIcon">{item.icon}</span>
                <span className="skills__learningName">{item.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
