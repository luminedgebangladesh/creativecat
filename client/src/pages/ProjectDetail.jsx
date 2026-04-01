import { useEffect, useRef, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Minus, Plus, X } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ScrollToTop from '../components/layout/ScrollToTop'
import { projects } from '../data/portfolio'

// Lightbox for gallery images
function Lightbox({ src, alt, project, onClose }) {
  const MIN_ZOOM = 1
  const MAX_ZOOM = 2.8
  const [zoom, setZoom] = useState(1)
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })
  const [viewerSize, setViewerSize] = useState({ width: 0, height: 0 })
  const viewerRef = useRef(null)

  const brandGradient = `linear-gradient(135deg, ${project.brandColor} 0%, ${project.accentColor} 100%)`
  const closeRingColor = `${project.brandColor}22`
  const softProjectGlow = `${project.brandColor}26`

  const updateZoom = (delta) => {
    setZoom((currentZoom) => {
      const nextZoom = currentZoom + delta
      return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number(nextZoom.toFixed(2))))
    })
  }

  const resetZoom = () => setZoom(1)
  const toggleZoom = () => setZoom((currentZoom) => (currentZoom === 1 ? 1.8 : 1))

  const fitScale = imageSize.width > 0 && imageSize.height > 0 && viewerSize.width > 0 && viewerSize.height > 0
    ? Math.min(viewerSize.width / imageSize.width, viewerSize.height / imageSize.height, 1)
    : 1

  const renderedImageWidth = Math.max(1, Math.round(imageSize.width * fitScale * zoom))
  const renderedImageHeight = Math.max(1, Math.round(imageSize.height * fitScale * zoom))
  const stageWidth = Math.max(renderedImageWidth, viewerSize.width || 0)
  const stageHeight = Math.max(renderedImageHeight, viewerSize.height || 0)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.classList.add('lightbox-open')

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === '+' || event.key === '=') updateZoom(0.2)
      if (event.key === '-') updateZoom(-0.2)
      if (event.key === '0') resetZoom()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.documentElement.classList.remove('lightbox-open')
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  useEffect(() => {
    if (!viewerRef.current) return

    const element = viewerRef.current
    const updateViewerSize = () => {
      setViewerSize({
        width: element.clientWidth - 20,
        height: element.clientHeight - 20,
      })
    }

    updateViewerSize()

    if (typeof ResizeObserver === 'undefined') return

    const observer = new ResizeObserver(updateViewerSize)
    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(8, 10, 20, 0.92)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 24px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        onClick={(event) => event.stopPropagation()}
        style={{
          width: 'min(1180px, 100%)',
          height: 'min(calc(100vh - 40px), 980px)',
          display: 'grid',
          gridTemplateRows: 'auto minmax(0, 1fr)',
          gap: '18px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ color: '#fff' }}>
            <div style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.72, marginBottom: '6px' }}>
              Project Gallery
            </div>
            <div style={{ fontSize: '18px', fontWeight: '700' }}>{alt}</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <motion.button
              type="button"
              onClick={() => updateZoom(-0.2)}
              disabled={zoom <= MIN_ZOOM}
              aria-label="Zoom out"
              whileHover={zoom <= MIN_ZOOM ? undefined : { y: -2, scale: 1.04 }}
              whileTap={zoom <= MIN_ZOOM ? undefined : { scale: 0.96 }}
              style={modalControlStyle(zoom <= MIN_ZOOM, closeRingColor)}
            >
              <Minus size={18} />
            </motion.button>
            <motion.button
              type="button"
              onClick={() => updateZoom(0.2)}
              disabled={zoom >= MAX_ZOOM}
              aria-label="Zoom in"
              whileHover={zoom >= MAX_ZOOM ? undefined : { y: -2, scale: 1.04 }}
              whileTap={zoom >= MAX_ZOOM ? undefined : { scale: 0.96 }}
              style={modalControlStyle(zoom >= MAX_ZOOM, closeRingColor)}
            >
              <Plus size={18} />
            </motion.button>
            <motion.button
              type="button"
              onClick={onClose}
              aria-label="Close image"
              whileHover={{ y: -2, scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                border: 'none',
                background: brandGradient,
                color: '#fff',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 22px 44px ${project.brandColor}30`,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease',
              }}
            >
              <X size={22} strokeWidth={2.5} />
            </motion.button>
          </div>
        </div>

        <div
          style={{
            background: 'rgba(255,255,255,0.96)',
            borderRadius: '24px',
            border: `1px solid ${closeRingColor}`,
            boxShadow: '0 36px 80px rgba(0,0,0,0.32)',
            overflow: 'hidden',
            padding: '18px',
          }}
        >
          <div
            ref={viewerRef}
            style={{
              height: '100%',
              minHeight: 'min(72vh, 760px)',
              overflow: 'auto',
              borderRadius: '18px',
              background: `radial-gradient(circle at top, ${softProjectGlow} 0%, rgba(255,255,255,0.96) 34%, rgba(255,255,255,0.94) 100%)`,
              scrollbarWidth: 'thin',
            }}
          >
            <div
              style={{
                width: stageWidth ? `${stageWidth}px` : '100%',
                height: stageHeight ? `${stageHeight}px` : '100%',
                minWidth: '100%',
                minHeight: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px',
              }}
            >
              <img
                src={src}
                alt={alt}
                onLoad={(event) => {
                  setImageSize({
                    width: event.currentTarget.naturalWidth,
                    height: event.currentTarget.naturalHeight,
                  })
                }}
                onClick={toggleZoom}
                onWheel={(event) => {
                  event.preventDefault()
                  updateZoom(event.deltaY < 0 ? 0.16 : -0.16)
                }}
                style={{
                  width: `${renderedImageWidth}px`,
                  height: `${renderedImageHeight}px`,
                  maxWidth: 'none',
                  maxHeight: 'none',
                  borderRadius: '18px',
                  objectFit: 'contain',
                  transition: 'width 0.18s ease, height 0.18s ease, box-shadow 0.2s ease',
                  userSelect: 'none',
                  boxShadow: `0 24px 60px ${project.brandColor}16`,
                  cursor: zoom > 1 ? 'zoom-out' : 'zoom-in',
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function modalControlStyle(disabled, borderColor) {
  return {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    border: `1px solid ${borderColor}`,
    background: 'rgba(255,255,255,0.12)',
    color: '#fff',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: disabled ? 0.42 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    backdropFilter: 'blur(10px)',
    transition: 'transform 0.2s ease, opacity 0.2s ease, border-color 0.2s ease, background 0.2s ease',
  }
}

function StoryCard({ label, copy, project, delay = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
      style={{
        background: 'rgba(255,255,255,0.06)',
        borderRadius: '26px',
        border: `1px solid ${project.accentColor}22`,
        padding: '28px',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div style={{ color: project.accentColor, fontSize: '11px', fontWeight: '800', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '14px' }}>
        {label}
      </div>
      <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '16px', lineHeight: '1.85' }}>
        {copy}
      </p>
    </motion.article>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find(p => p.slug === slug)
  const [lightbox, setLightbox] = useState(null)

  if (!project) return <Navigate to="/projects" replace />

  const currentIdx = projects.findIndex(p => p.slug === slug)
  const prevProject = projects[(currentIdx - 1 + projects.length) % projects.length]
  const nextProject = projects[(currentIdx + 1) % projects.length]

  const pillBg = `${project.brandColor}18`
  const pillColor = project.brandColor === '#0f0f0f' || project.brandColor === '#111111' || project.brandColor === '#1c1c1c'
    ? project.accentColor
    : project.brandColor
  const heroImage = project.heroImage || project.image
  const heroBackgroundPosition = project.heroImagePosition || project.cardPosition || 'center'
  const galleryAspectRatio = project.galleryAspectRatio || '4 / 5'
  const galleryPadding = project.galleryPadding || '16px'
  const galleryBackground = project.galleryBackground || `linear-gradient(180deg, #ffffff 0%, ${project.brandColor}10 100%)`
  const storyCards = [
    project.challenge ? { label: 'Challenge', copy: project.challenge } : null,
    project.approach ? { label: 'Approach', copy: project.approach } : null,
    project.outcome ? { label: 'Outcome', copy: project.outcome } : null,
  ].filter(Boolean)

  return (
    <>
      <Helmet>
        <title>{project.title} - Creative Cat</title>
        <meta name="description" content={project.overview} />
        <meta property="og:title" content={`${project.title} - Creative Cat`} />
        <meta property="og:description" content={project.tagline} />
      </Helmet>

      <Navbar />

      <main style={{ paddingTop: '72px' }}>

        {/* ── Hero ─────────────────────────────────────────── */}
        <section
          style={{
            position: 'relative',
            minHeight: '440px',
            display: 'flex',
            alignItems: 'center',
            backgroundImage: `url(${heroImage})`,
            backgroundPosition: heroBackgroundPosition,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            padding: '100px 0 80px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(20deg, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.78) 50%, rgba(0,0,0,0.58) 100%)',
              zIndex: 1,
            }}
          />

          <div style={{ position: 'absolute', width: '560px', height: '560px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', top: '-180px', right: '-80px', pointerEvents: 'none', zIndex: 2 }} />
          <div style={{ position: 'absolute', width: '320px', height: '320px', borderRadius: '50%', background: 'rgba(255,255,255,0.02)', bottom: '-100px', left: '5%', pointerEvents: 'none', zIndex: 2 }} />

          <div className="container" style={{ position: 'relative', zIndex: 10 }}>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
              <Link
                to="/projects"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  color: '#fff',
                  fontSize: '13px',
                  fontWeight: '700',
                  textDecoration: 'none',
                  marginBottom: '32px',
                  padding: '8px 16px 8px 12px',
                  borderRadius: '100px',
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.22)',
                  backdropFilter: 'blur(12px)',
                  transition: 'background 0.2s, border-color 0.2s',
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.background = 'rgba(255,255,255,0.22)'
                  event.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.background = 'rgba(255,255,255,0.12)'
                  event.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'
                }}
              >
                <ArrowLeft size={13} /> Back to Projects
              </Link>

              <span
                style={{
                  display: 'inline-block',
                  background: `${project.brandColor}cc`,
                  backdropFilter: 'blur(8px)',
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: '800',
                  letterSpacing: '2.5px',
                  textTransform: 'uppercase',
                  padding: '5px 14px',
                  borderRadius: '100px',
                  marginBottom: '20px',
                }}
              >
                {project.category}
              </span>

              <h1
                style={{
                  fontSize: 'clamp(38px, 6vw, 80px)',
                  fontWeight: '800',
                  color: '#fff',
                  lineHeight: '1.04',
                  letterSpacing: '-2.5px',
                  marginBottom: '18px',
                  fontFamily: 'var(--font-heading)',
                  maxWidth: '8ch',
                }}
              >
                {project.title}
              </h1>

              <p
                style={{
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: '18px',
                  lineHeight: '1.65',
                  maxWidth: '560px',
                }}
              >
                {project.tagline}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Overview ─────────────────────────────────────── */}
        <section style={{ background: '#fff', padding: '84px 0' }}>
          <div className="container detail-summary-grid" style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: '54px', alignItems: 'start' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <span className="section-tag">Case Study</span>
              <h2 className="section-title" style={{ maxWidth: '12ch' }}>
                About this project
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.9', marginBottom: '22px' }}>
                {project.overview}
              </p>

              {project.projectType && (
                <div
                  style={{
                    borderRadius: '24px',
                    padding: '22px 24px',
                    background: `linear-gradient(135deg, ${project.brandColor}0f 0%, ${project.accentColor}14 100%)`,
                    border: `1px solid ${project.brandColor}18`,
                  }}
                >
                  <div style={{ color: 'var(--text-muted)', fontSize: '11px', fontWeight: '800', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '10px' }}>
                    Project Focus
                  </div>
                  <div style={{ color: 'var(--text-primary)', fontSize: '22px', fontWeight: '800', lineHeight: 1.35 }}>
                    {project.projectType}
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.06 }}
            >
              <div style={{ marginBottom: '28px' }}>
                <h3 style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '14px' }}>
                  Services Delivered
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {project.services.map((service) => (
                    <span
                      key={service}
                      style={{
                        padding: '7px 15px',
                        borderRadius: '100px',
                        background: pillBg,
                        color: pillColor,
                        fontSize: '13px',
                        fontWeight: '600',
                        border: `1px solid ${pillColor}22`,
                      }}
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {project.highlights?.length > 0 && (
                <div
                  style={{
                    borderRadius: '26px',
                    padding: '26px',
                    background: '#f7f9ff',
                    border: `1px solid ${project.brandColor}14`,
                    boxShadow: `0 20px 48px ${project.brandColor}0c`,
                  }}
                >
                  <div style={{ color: pillColor, fontSize: '11px', fontWeight: '800', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '14px' }}>
                    Key Highlights
                  </div>
                  <ul style={{ display: 'grid', gap: '12px', paddingLeft: '18px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                    {project.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {storyCards.length > 0 && (
          <section style={{ background: '#0b1120', padding: '84px 0' }}>
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.42 }}
                style={{ textAlign: 'center', marginBottom: '36px' }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', padding: '7px 15px', borderRadius: '999px', background: 'rgba(255,255,255,0.08)', color: '#dbe4ff', fontSize: '11px', fontWeight: '800', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '16px' }}>
                  Creative Direction
                </span>
                <h2 style={{ fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: '800', color: '#fff', lineHeight: 1.02, marginBottom: '12px' }}>
                  How the case study was shaped
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.68)', fontSize: '16px', lineHeight: '1.85', maxWidth: '60ch', margin: '0 auto' }}>
                  A deeper look at the creative decisions, constraints, and outcomes that shaped this project.
                </p>
              </motion.div>

              <div className="detail-story-grid" style={{ display: 'grid', gridTemplateColumns: storyCards.length >= 3 ? 'repeat(3, minmax(0, 1fr))' : 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
                {storyCards.map((card, index) => (
                  <StoryCard
                    key={card.label}
                    label={card.label}
                    copy={card.copy}
                    project={project}
                    delay={index * 0.06}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Gallery ──────────────────────────────────────── */}
        <section style={{ background: '#f8f9fc', padding: '80px 0' }}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', gap: '24px', alignItems: 'flex-end', flexWrap: 'wrap' }}
            >
              <div>
                <span className="section-tag">Gallery</span>
                <h2 className="section-title" style={{ marginBottom: '10px' }}>Project Gallery</h2>
                <p className="section-subtitle" style={{ maxWidth: '62ch' }}>
                  Click any visual to open the full image in a zoomable lightbox.
                </p>
              </div>
            </motion.div>

            <div className="gallery-grid">
              {project.images.map((src, i) => (
                <motion.button
                  key={i}
                  type="button"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="gallery-item"
                  onClick={() => setLightbox({ src, alt: `${project.title} ${i + 1}` })}
                  style={{
                    cursor: 'zoom-in',
                    background: galleryBackground,
                    border: `1px solid ${project.brandColor}18`,
                    boxShadow: `0 20px 40px ${project.brandColor}12`,
                    aspectRatio: galleryAspectRatio,
                  }}
                >
                  <img
                    src={src}
                    alt={`${project.title} ${i + 1}`}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'block',
                      borderRadius: '16px',
                      objectFit: 'contain',
                      padding: galleryPadding,
                    }}
                  />
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Prev / Next ───────────────────────────────────── */}
        <section style={{ background: '#fff', padding: '64px 0', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <div className="container nav-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

            <NavCard project={prevProject} direction="prev" />
            <NavCard project={nextProject} direction="next" />

          </div>
        </section>

      </main>

      <Footer />
      <ScrollToTop />

      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} project={project} onClose={() => setLightbox(null)} />}

      <style>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
          align-items: stretch;
        }
        .gallery-item {
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: none;
        }
        .gallery-item img {
          transition: transform 0.35s ease;
        }
        .gallery-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 26px 48px rgba(9, 20, 44, 0.16);
        }
        .gallery-item:hover img {
          transform: scale(1.02);
        }
        @media (max-width: 1024px) {
          .detail-hero-grid,
          .detail-summary-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 900px) {
          .gallery-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 768px) {
          .nav-grid {
            grid-template-columns: 1fr !important;
          }

          .detail-story-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 540px) {
          .gallery-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .nav-card { padding: 24px 20px !important; height: 200px !important; }
          .nav-card-title { font-size: 20px !important; letter-spacing: -0.4px !important; }
        }
        @media (max-width: 480px) {
          .nav-card { height: 180px !important; }
          .nav-card-title { font-size: 18px !important; }
        }
      `}</style>
    </>
  )
}

function NavCard({ project, direction }) {
  const [hovered, setHovered] = useState(false)
  const mediaFit = project.cardFit || 'cover'
  const mediaPosition = project.cardPosition || 'center'
  const mediaPadding = project.cardPadding || '0'
  const mediaBackground = project.cardBackground || '#101827'

  return (
    <Link
      to={`/projects/${project.slug}`}
      style={{ textDecoration: 'none', display: 'block' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="nav-card" style={{
        position: 'relative',
        height: '240px',
        borderRadius: '24px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '32px 40px',
        transition: 'all 0.5s cubic-bezier(0.2, 1, 0.3, 1)',
        textAlign: direction === 'next' ? 'right' : 'left',
        alignItems: direction === 'next' ? 'flex-end' : 'flex-start',
        boxShadow: hovered ? '0 30px 60px rgba(0,0,0,0.25)' : '0 10px 30px rgba(0,0,0,0.1)',
        transform: hovered ? 'translateY(-8px)' : 'none',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: mediaBackground }}>
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: mediaFit,
              objectPosition: mediaPosition,
              padding: mediaPadding,
              transform: hovered ? 'scale(1.08)' : 'scale(1)',
              transition: 'transform 1.2s cubic-bezier(0.2, 1, 0.3, 1)',
            }}
          />
        </div>

        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.36) 0%, rgba(0,0,0,0.74) 100%)',
          zIndex: 1
        }} />

        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            fontSize: '11px', fontWeight: '900', letterSpacing: '3px',
            textTransform: 'uppercase',
            color: hovered ? '#fff' : 'rgba(255,255,255,0.6)',
            transition: 'all 0.3s',
            flexDirection: direction === 'next' ? 'row-reverse' : 'row',
          }}>
            {direction === 'prev' ? <ArrowLeft size={14} strokeWidth={3} /> : <ArrowRight size={14} strokeWidth={3} />}
            {direction === 'prev' ? 'Previous Work' : 'Next Work'}
          </div>

          <div className="nav-card-title" style={{
            fontWeight: '800', fontSize: '28px', letterSpacing: '-0.8px',
            color: '#fff',
            fontFamily: 'var(--font-heading)',
            marginTop: '4px',
            transition: 'transform 0.4s',
            transform: hovered ? 'scale(1.02)' : 'none',
          }}>
            {project.title}
          </div>

          <span style={{
            fontSize: '12px', fontWeight: '700', letterSpacing: '2px',
            textTransform: 'uppercase',
            color: hovered ? project.accentColor : 'rgba(255,255,255,0.5)',
            transition: 'color 0.3s',
          }}>
            {project.category}
          </span>

          {/* Animated Accent Line */}
          <div style={{
            height: '4px', 
            width: hovered ? '80px' : '40px',
            borderRadius: '2px',
            background: `linear-gradient(90deg, ${project.brandColor}, ${project.accentColor})`,
            transition: 'all 0.5s cubic-bezier(0.2, 1, 0.3, 1)',
            marginTop: '12px',
          }} />
        </div>
      </div>
    </Link>
  )
}
