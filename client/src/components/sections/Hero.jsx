import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useCallback } from 'react'
import ParticlesBackground from '../ui/ParticlesBackground'

const CAT_IMG = 'https://creativecat.digital/wp-content/uploads/2025/03/Cat.png'
const CLIENT_PHOTOS = [
  'https://creativecat.digital/wp-content/uploads/2024/05/beauty-and-skincare-concept-close-up-of-smiling-a-6MMQM3B-300x300.jpg',
  'https://creativecat.digital/wp-content/uploads/2024/05/indoor-shot-of-satisfied-beautiful-woman-with-dark-9J24FC3-300x300.jpg',
  'https://creativecat.digital/wp-content/uploads/2024/05/smiling-middle-eastern-man-in-casual-with-laptop-Y9EY47V-300x300.jpg',
  'https://creativecat.digital/wp-content/uploads/2024/05/happy-insian-woman-gesturing-ok-sign-and-smiling-92S8ZBS-300x300.jpg',
]

const socialBubbles = [
  { bg: '#1877f2', pos: { top: '18%', left: '-4%' },
    icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
  { bg: '#ff0000', pos: { top: '44%', left: '-8%' },
    icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#fff"/></svg> },
  { bg: '#010101', pos: { top: '70%', left: '-6%' },
    icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="#fff"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.21 8.21 0 0 0 4.79 1.53V6.78a4.85 4.85 0 0 1-1.02-.09z"/></svg> },
  { bg: '#e1306c', pos: { top: '20%', right: '-4%' },
    icon: <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
  { bg: '#1d9bf0', pos: { top: '64%', right: '-6%' },
    icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="#fff"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
]

export default function Hero() {
  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  // ── Refs (all declared first) ────────────────────────────────
  const sectionRef     = useRef(null)

  // ── Motion values ────────────────────────────────────────────
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const springCfg = { damping: 22, stiffness: 110 }
  const mx = useSpring(rawX, springCfg)
  const my = useSpring(rawY, springCfg)

  // ── Layer parallax transforms ────────────────────────────────
  const bgX  = useTransform(mx, v => v * 0.018)
  const bgY  = useTransform(my, v => v * 0.018)
  const catX = useTransform(mx, v => v * -0.038)
  const catY = useTransform(my, v => v * -0.028)
  const fgX  = useTransform(mx, v => v * -0.065)

  // ── Event handlers ────────────────────────────────────────────
  const handleMouseMove = useCallback((e) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    const relX = e.clientX - rect.left
    const relY = e.clientY - rect.top
    rawX.set(relX - rect.width / 2)
    rawY.set(relY - rect.height / 2)
  }, [rawX, rawY])

  const handleMouseLeave = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
  }, [rawX, rawY])

  return (
    <section
      id="home"
      data-cursor-zone="true"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '96px',
        background: 'var(--bg-primary)',
      }}
    >
      {/* Ambient gradients — z:0 */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: 'var(--gradient-ambient)', opacity: 1,
        }}
      />
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: 'radial-gradient(900px 500px at 60% 55%, rgba(255,255,255,0.04) 0%, transparent 70%)',
        }}
      />

      <ParticlesBackground />


      {/* Main content — z:2 (always above canvas) */}
      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }} className="hero-grid">

          {/* Left */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="section-tag">Creative Cat Digital Marketing Agency</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontSize: 'clamp(40px, 6.2vw, 78px)',
                fontWeight: '800',
                lineHeight: '1.02',
                color: '#0f172a',
                marginBottom: '18px',
                letterSpacing: '-2.4px',
              }}
            >
              A portfolio-first agency<br />
              for growth‑driven brands.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                color: 'var(--text-secondary)',
                fontSize: '16px',
                lineHeight: '1.85',
                marginBottom: '28px',
                maxWidth: '560px',
              }}
            >
              We help businesses stand out and scale with brand guidelines, design systems, SEO, paid ads,
              and high-performing creative. Built for clarity, consistency, and measurable results.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hero-buttons"
              style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '40px' }}
            >
              <button className="btn-primary" onClick={() => scrollTo('#portfolio')}>View Work</button>
              <button className="btn-dark" onClick={() => scrollTo('#contact')}>Start a Project</button>
              <button className="btn-outline" onClick={() => scrollTo('#brand-guidelines')}>Brand Guidelines</button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
            >
              <div style={{ display: 'flex' }}>
                {CLIENT_PHOTOS.map((src, i) => (
                  <img
                    key={i} src={src} alt="client"
                    style={{
                      width: '40px', height: '40px', borderRadius: '50%',
                      border: '2px solid #fff',
                      marginLeft: i === 0 ? 0 : '-10px',
                      objectFit: 'cover',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    }}
                  />
                ))}
              </div>
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>85+ Satisfied Clients</span>
            </motion.div>
          </div>

          {/* Right — cat + floating elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '460px' }}
            className="hero-right"
          >
            {/* Background circles — layer 1 */}
            <motion.div
              style={{
                x: bgX, y: bgY,
                width: '380px', height: '380px', borderRadius: '50%',
                background: 'rgba(255,105,0,0.06)',
                border: '1px solid rgba(255,105,0,0.14)',
                position: 'absolute',
              }}
            />
            <motion.div
              style={{
                x: bgX, y: bgY,
                width: '320px', height: '320px', borderRadius: '50%',
                background: 'radial-gradient(circle at 30% 20%, rgba(255,105,0,0.26), transparent 60%)',
                position: 'absolute',
              }}
            />

            {/* Cat image — layer 2 */}
            <motion.img
              src={CAT_IMG} alt="Creative Cat"
              style={{ x: catX, y: catY, maxHeight: '440px', width: 'auto', position: 'relative', zIndex: 1 }}
            />

            {/* Social bubbles — layer 3 */}
            {socialBubbles.map((b, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, i % 2 === 0 ? -8 : 8, 0] }}
                transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                style={{
                  x: fgX,
                  position: 'absolute', zIndex: 2, ...b.pos,
                  width: '46px', height: '46px', borderRadius: '50%',
                  background: b.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 10px 24px rgba(9,20,44,0.22)',
                  border: '1px solid rgba(255,255,255,0.7)',
                }}
              >
                {b.icon}
              </motion.div>
            ))}

            {/* Stat card — top right */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                x: fgX,
                position: 'absolute', top: '4%', right: '-2%', zIndex: 3,
                background: '#fff', borderRadius: '12px', padding: '12px 18px',
                boxShadow: '0 8px 24px rgba(9,20,44,0.16)', minWidth: '140px',
                border: '1px solid rgba(0,0,0,0.05)',
              }}
            >
              <div style={{ fontSize: '20px', fontWeight: '800', fontFamily: 'var(--font-heading)', color: 'var(--accent)' }}>180+</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '12px', fontWeight: '500' }}>Brands Joined</div>
            </motion.div>

            {/* Stat card — bottom left */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
              style={{
                x: fgX,
                position: 'absolute', bottom: '6%', left: '-2%', zIndex: 3,
                background: '#fff', borderRadius: '12px', padding: '12px 18px',
                boxShadow: '0 8px 24px rgba(9,20,44,0.16)', minWidth: '130px',
                border: '1px solid rgba(0,0,0,0.05)',
              }}
            >
              <div style={{ fontSize: '20px', fontWeight: '800', fontFamily: 'var(--font-heading)', color: 'var(--accent)' }}>85%</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '12px', fontWeight: '500' }}>Sales Growth</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-right { display: none !important; }
        }
        @media (max-width: 480px) {
          .hero-grid { gap: 0 !important; }
          .hero-buttons { gap: 12px !important; }
          .hero-buttons .btn-primary,
          .hero-buttons .btn-dark,
          .hero-buttons .btn-outline { width: 100%; justify-content: center; }
        }
      `}</style>
    </section>
  )
}
