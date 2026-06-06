import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import { useLang } from "../i18n/LanguageContext";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, scale: 0.74, filter: "blur(18px)", rotateX: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    rotateX: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Projects() {
  const { t } = useLang();

  return (
    <section className="projects" id="projects">
      <div className="projects__container">
        <motion.h2
          className="projects__title"
          initial={{ opacity: 0, scale: 0.8, filter: "blur(16px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          {t.projects.title}
        </motion.h2>

        <motion.div
          className="projects__grid"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.05 }}
        >
          {t.projects.items.map((p, i) => (
            <motion.a
              key={p.url}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="project__card"
              variants={fadeUp}
              whileHover={{ scale: 1.03, rotateX: -4, boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="project__num">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="project__body">
                <div className="project__head">
                  <h3 className="project__name">{p.title}</h3>
                  <FiExternalLink className="project__linkIcon" />
                </div>

                <p className="project__desc">{p.desc}</p>

                <div className="project__tags">
                  {p.tags.map((tag) => (
                    <span key={tag} className="project__tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
