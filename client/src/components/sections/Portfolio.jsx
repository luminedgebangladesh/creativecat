import { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { projects } from '../../data/portfolio'

const revealEase = [0.22, 1, 0.36, 1]
const tiltSpring = { stiffness: 180, damping: 22, mass: 0.8 }
const titleWords = ['Explore', 'Our', 'Portfolio']

function PortfolioCard({ project, index, inView, reduceMotion }) {
  const [hovered, setHovered] = useState(false)
  const pointerX = useMotionValue(50)
  const pointerY = useMotionValue(50)
  const baseRotateX = useMotionValue(0)
  const baseRotateY = useMotionValue(0)
  const baseLift = useMotionValue(0)

  const rotateX = useSpring(baseRotateX, tiltSpring)
  const rotateY = useSpring(baseRotateY, tiltSpring)
  const lift = useSpring(baseLift, { ...tiltSpring, stiffness: 160, damping: 20 })
  const glowX = useSpring(pointerX, { stiffness: 260, damping: 30, mass: 0.45 })
  const glowY = useSpring(pointerY, { stiffness: 260, damping: 30, mass: 0.45 })
  const imageX = useTransform(rotateY, [-10, 10], [-10, 10])
  const imageY = useTransform(rotateX, [-10, 10], [10, -10])
  const imageScale = useTransform(lift, [-10, 0], [1.08, 1.01])
  const sheenX = useTransform(rotateY, [-10, 10], [-14, 14])
  const sheenY = useTransform(rotateX, [-10, 10], [12, -12])
  const spotlight = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0.14) 18%, transparent 46%)`
  const mediaFit = project.cardFit || 'cover'
  const mediaPosition = project.cardPosition || 'center'
  const mediaPadding = project.cardPadding || '0'
  const mediaBackground = project.cardBackground || '#dbe2f0'
  const mediaImageStyle = {
    objectFit: mediaFit,
    objectPosition: mediaPosition,
    padding: mediaPadding,
  }

  const handleMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - bounds.left) / bounds.width
    const py = (event.clientY - bounds.top) / bounds.height

    pointerX.set(px * 100)
    pointerY.set(py * 100)
    setHovered(true)

    if (reduceMotion) return

    baseRotateY.set((px - 0.5) * 14)
    baseRotateX.set((0.5 - py) * 12)
    baseLift.set(-8)
  }

  const handleLeave = () => {
    setHovered(false)
    pointerX.set(50)
    pointerY.set(50)
    baseRotateX.set(0)
    baseRotateY.set(0)
    baseLift.set(0)
  }

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: reduceMotion ? 0 : 64,
        scale: reduceMotion ? 1 : 0.94,
        filter: reduceMotion ? 'none' : 'blur(10px)',
      }}
      animate={inView ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.9, delay: index * 0.08, ease: revealEase }}
      whileTap={reduceMotion ? undefined : { scale: 0.985 }}
      style={reduceMotion
        ? { height: '100%' }
        : {
            height: '100%',
            y: lift,
            rotateX,
            rotateY,
            transformPerspective: 1400,
            transformStyle: 'preserve-3d',
          }}
    >
      <Link
        to={`/projects/${project.slug}`}
        className="portfolio-modern-link"
        data-cursor-link="true"
        onPointerMove={handleMove}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={handleLeave}
        onFocus={() => {
          setHovered(true)
          pointerX.set(50)
          pointerY.set(50)
        }}
        onBlur={handleLeave}
        style={{ textDecoration: 'none', height: '100%', display: 'block' }}
      >
        <div
          className="portfolio-modern-card"
          style={{
            '--project-primary': project.brandColor,
            '--project-secondary': project.accentColor,
            '--project-primary-soft': `${project.brandColor}99`,
            '--project-secondary-soft': `${project.accentColor}88`,
          }}
        >
          <div className="portfolio-modern-media" style={{ background: mediaBackground }}>
            <motion.img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="portfolio-modern-image"
              style={reduceMotion
                ? mediaImageStyle
                : {
                    ...mediaImageStyle,
                    x: imageX,
                    y: imageY,
                    scale: imageScale,
                  }}
            />
            <div className="portfolio-modern-tint" />
            <motion.div
              className="portfolio-modern-orbit"
              aria-hidden="true"
              animate={reduceMotion ? { opacity: 0.4, scale: 1 } : {
                x: ['-10%', '8%', '-4%'],
                y: ['-8%', '10%', '-6%'],
                scale: [1, 1.14, 0.96],
                opacity: [0.34, 0.5, 0.32],
              }}
              transition={{
                duration: 8 + index * 0.8,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="portfolio-modern-sheen"
              aria-hidden="true"
              style={reduceMotion ? undefined : { x: sheenX, y: sheenY }}
              animate={hovered ? { opacity: 0.82 } : { opacity: 0.3 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            />
            <motion.div
              className="portfolio-modern-glow"
              aria-hidden="true"
              style={{ background: spotlight }}
              animate={hovered ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
            />

            <div className="portfolio-modern-top">
              <span className="portfolio-modern-pill">{project.category}</span>
              <motion.span
                className="portfolio-modern-icon"
                animate={hovered || reduceMotion
                  ? { opacity: 1, y: 0, scale: 1, rotate: 0 }
                  : { opacity: 0, y: 10, scale: 0.92, rotate: -12 }}
                transition={{ duration: 0.35, ease: revealEase }}
              >
                <ArrowUpRight size={18} strokeWidth={2.2} />
              </motion.span>
            </div>
          </div>

          <div className="portfolio-modern-body">
            <h3 className="portfolio-modern-title">{project.title}</h3>
            <p className="portfolio-modern-copy">{project.description}</p>
            <div className="portfolio-modern-footer">
              <span className="portfolio-modern-label">{project.category}</span>
              <span className="portfolio-modern-line" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

export default function Portfolio() {
  const sectionRef = useRef(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const reduceMotion = useReducedMotion()
  const setRefs = useCallback((node) => {
    sectionRef.current = node
    ref(node)
  }, [ref])
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 0 : 36, reduceMotion ? 0 : -18])
  const gridY = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 0 : 18, reduceMotion ? 0 : -22])
  const ambientOneY = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 0 : 90, reduceMotion ? 0 : -70])
  const ambientTwoY = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 0 : -50, reduceMotion ? 0 : 80])
  const ambientThreeRotate = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 0 : -8, reduceMotion ? 0 : 12])

  return (
    <section
      id="portfolio"
      ref={setRefs}
      style={{
        background: 'var(--bg-primary)',
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden',
        isolation: 'isolate',
      }}
    >
      <motion.div
        className="portfolio-modern-ambient portfolio-modern-ambient--one"
        aria-hidden="true"
        style={{ y: ambientOneY }}
        animate={reduceMotion ? { opacity: 0.55 } : { opacity: [0.44, 0.64, 0.5], scale: [1, 1.08, 0.98] }}
        transition={{ duration: 14, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />
      <motion.div
        className="portfolio-modern-ambient portfolio-modern-ambient--two"
        aria-hidden="true"
        style={{ y: ambientTwoY }}
        animate={reduceMotion ? { opacity: 0.48 } : { opacity: [0.32, 0.58, 0.4], scale: [0.96, 1.08, 1] }}
        transition={{ duration: 16, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />
      <motion.div
        className="portfolio-modern-ambient portfolio-modern-ambient--three"
        aria-hidden="true"
        style={{ rotate: ambientThreeRotate }}
        animate={reduceMotion ? { opacity: 0.55 } : { y: [0, 16, 0], opacity: [0.42, 0.62, 0.42] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      >
        <img
          src="https://creativecat.digital/wp-content/uploads/2025/03/Cat.png"
          alt=""
          aria-hidden="true"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'bottom center',
            display: 'block',
          }}
        />
      </motion.div>

      <motion.div className="container portfolio-modern-hero" style={{ y: heroY }}>
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: revealEase }}
        >
          <span className="section-tag">OUR WORK</span>
        </motion.div>

        <h2 className="section-title portfolio-modern-heading">
          {titleWords.map((word, index) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 52, rotateX: reduceMotion ? 0 : -70 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.08 + index * 0.08, ease: revealEase }}
            >
              {word}
            </motion.span>
          ))}
        </h2>

        <motion.p
          className="section-subtitle portfolio-modern-subtitle"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20, filter: reduceMotion ? 'none' : 'blur(8px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.8, delay: 0.22, ease: revealEase }}
        >
          A showcase of brands we've helped build, grow, and transform through creative digital marketing.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 24, scale: reduceMotion ? 1 : 0.94 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.32, ease: revealEase }}
          whileHover={reduceMotion ? undefined : { y: -2 }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        >
          <Link to="/projects" className="btn-dark portfolio-modern-cta">
            View all projects
          </Link>
        </motion.div>
      </motion.div>

      <motion.div className="container" style={{ position: 'relative', zIndex: 1, y: gridY }}>
        <div
          className="portfolio-modern-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '26px',
            alignItems: 'stretch',
          }}
        >
          {projects.map((project, index) => (
            <PortfolioCard
              key={project.id}
              project={project}
              index={index}
              inView={inView}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </motion.div>

      <style>{`
        .portfolio-modern-hero {
          text-align: center;
          margin-bottom: 52px;
          position: relative;
          z-index: 1;
        }

        .portfolio-modern-heading {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.24em;
          perspective: 1200px;
        }

        .portfolio-modern-heading span {
          display: inline-block;
          transform-origin: 50% 100%;
          will-change: transform, opacity;
        }

        .portfolio-modern-subtitle {
          margin: 0 auto 34px;
          max-width: 620px;
        }

        .portfolio-modern-cta {
          position: relative;
          overflow: hidden;
          box-shadow: 0 18px 36px rgba(9, 20, 44, 0.16);
        }

        .portfolio-modern-cta::before {
          content: '';
          position: absolute;
          inset: 1px;
          border-radius: inherit;
          background: linear-gradient(120deg, rgba(255,255,255,0.22), transparent 38%, transparent 62%, rgba(255,255,255,0.1));
          opacity: 0.85;
          pointer-events: none;
        }

        .portfolio-modern-ambient {
          position: absolute;
          border-radius: 999px;
          pointer-events: none;
          z-index: 0;
          will-change: transform, opacity;
        }

        .portfolio-modern-ambient--one {
          width: 420px;
          height: 420px;
          left: -140px;
          top: 80px;
          background: radial-gradient(circle, rgba(255,105,0,0.16) 0%, rgba(255,105,0,0.08) 34%, transparent 72%);
          filter: blur(22px);
        }

        .portfolio-modern-ambient--two {
          width: 540px;
          height: 540px;
          right: -180px;
          bottom: 20px;
          background: radial-gradient(circle, rgba(91,78,158,0.18) 0%, rgba(59,130,246,0.1) 38%, transparent 70%);
          filter: blur(30px);
        }

        .portfolio-modern-ambient--three {
          width: 180px;
          height: 180px;
          right: 12%;
          top: 120px;
          border-radius: 38px;
          border: 1px solid rgba(91,78,158,0.12);
          background: linear-gradient(180deg, rgba(255,255,255,0.86) 0%, rgba(255,255,255,0.14) 100%);
          box-shadow: 0 24px 60px rgba(9, 20, 44, 0.08);
          backdrop-filter: blur(10px);
        }

        .portfolio-modern-card {
          position: relative;
          height: 100%;
          border-radius: 30px;
          padding: 14px;
          overflow: hidden;
          transform-style: preserve-3d;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(246,248,255,0.98) 100%);
          border: 1px solid rgba(10, 16, 30, 0.08);
          box-shadow: 0 18px 42px rgba(9, 20, 44, 0.08);
          transition:
            transform 0.42s cubic-bezier(0.22, 0.61, 0.36, 1),
            box-shadow 0.42s cubic-bezier(0.22, 0.61, 0.36, 1),
            border-color 0.28s ease;
        }

        .portfolio-modern-link:hover .portfolio-modern-card {
          transform: translateY(-4px);
          border-color: rgba(10, 16, 30, 0.14);
          box-shadow: 0 28px 62px rgba(9, 20, 44, 0.14);
        }

        .portfolio-modern-media {
          position: relative;
          overflow: hidden;
          aspect-ratio: 5 / 4;
          border-radius: 24px;
          transform: translateZ(24px);
        }

        .portfolio-modern-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: filter 0.35s ease;
          will-change: transform;
        }

        .portfolio-modern-link:hover .portfolio-modern-image {
          filter: saturate(1.05) contrast(1.02);
        }

        .portfolio-modern-tint {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(8, 12, 22, 0.04) 0%, rgba(8, 12, 22, 0.18) 100%),
            linear-gradient(145deg, var(--project-primary-soft), var(--project-secondary-soft));
          opacity: 0.18;
          transition: opacity 0.3s ease;
        }

        .portfolio-modern-link:hover .portfolio-modern-tint {
          opacity: 0.28;
        }

        .portfolio-modern-orbit {
          position: absolute;
          width: 44%;
          aspect-ratio: 1;
          top: -10%;
          right: -6%;
          border-radius: 999px;
          background: radial-gradient(circle, var(--project-secondary-soft) 0%, rgba(255,255,255,0.08) 44%, transparent 74%);
          filter: blur(24px);
          pointer-events: none;
          mix-blend-mode: screen;
        }

        .portfolio-modern-sheen {
          position: absolute;
          inset: -12%;
          background: linear-gradient(120deg, transparent 14%, rgba(255,255,255,0.28) 42%, rgba(255,255,255,0.08) 56%, transparent 74%);
          pointer-events: none;
          mix-blend-mode: screen;
        }

        .portfolio-modern-glow {
          position: absolute;
          inset: -6%;
          pointer-events: none;
          mix-blend-mode: screen;
        }

        .portfolio-modern-top {
          position: absolute;
          inset: 18px 18px auto 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          z-index: 2;
          transform: translateZ(36px);
        }

        .portfolio-modern-pill {
          display: inline-flex;
          align-items: center;
          padding: 9px 16px;
          border-radius: 999px;
          background: rgba(255,255,255,0.22);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.18);
          color: #ffffff;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .portfolio-modern-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 999px;
          background: rgba(10,16,30,0.7);
          color: #ffffff;
          box-shadow: 0 12px 24px rgba(9, 20, 44, 0.18);
          will-change: transform, opacity;
        }

        .portfolio-modern-link:hover .portfolio-modern-icon {
          background: linear-gradient(135deg, var(--project-primary), var(--project-secondary));
        }

        .portfolio-modern-body {
          position: relative;
          padding: 18px 8px 8px;
          z-index: 1;
          transform: translateZ(28px);
        }

        .portfolio-modern-title {
          font-size: clamp(23px, 2vw, 30px);
          font-weight: 800;
          line-height: 0.98;
          letter-spacing: -0.04em;
          color: var(--text-primary);
          margin-bottom: 12px;
          transition: color 0.25s ease;
        }

        .portfolio-modern-link:hover .portfolio-modern-title {
          color: var(--accent-2);
        }

        .portfolio-modern-copy {
          color: var(--text-secondary);
          font-size: 15px;
          line-height: 1.75;
          margin-bottom: 18px;
        }

        .portfolio-modern-footer {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .portfolio-modern-label {
          flex-shrink: 0;
          color: #8c93b1;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .portfolio-modern-line {
          height: 1px;
          width: 100%;
          background: linear-gradient(90deg, var(--project-primary-soft), rgba(12, 18, 30, 0.08));
          transition: transform 0.28s ease;
          transform-origin: left;
        }

        .portfolio-modern-link:hover .portfolio-modern-line {
          transform: scaleX(1.06);
        }

        @media (max-width: 980px) {
          .portfolio-modern-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }

          .portfolio-modern-ambient--three {
            right: 6%;
            top: 150px;
            width: 140px;
            height: 140px;
          }
        }

        @media (max-width: 640px) {
          .portfolio-modern-hero {
            margin-bottom: 40px;
          }

          .portfolio-modern-heading {
            gap: 0.18em;
          }

          .portfolio-modern-grid {
            grid-template-columns: 1fr !important;
          }

          .portfolio-modern-title {
            font-size: 24px;
          }

          .portfolio-modern-copy {
            font-size: 14px;
          }

          .portfolio-modern-ambient--one {
            width: 280px;
            height: 280px;
            left: -100px;
          }

          .portfolio-modern-ambient--two {
            width: 320px;
            height: 320px;
            right: -120px;
          }

          .portfolio-modern-ambient--three {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}
