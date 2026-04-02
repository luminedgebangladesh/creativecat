import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import AnimatedCounter from '../ui/AnimatedCounter'

const ABOUT_FIGURE_IMG = 'https://creativecat.digital/wp-content/uploads/2024/05/31.png'
const ABOUT_CHART_IMG = 'https://creativecat.digital/wp-content/uploads/2024/05/card.png'

const competencies = [
  { title: 'Optimization Engine Rank', sub: 'Professional Creative Services You Can Trust' },
  { title: 'Listen & Engage with Client', sub: "We're small but mighty and growing fast!" },
  { title: 'Client satisfaction is our top priority', sub: 'Our strength is accentuated by our global presence, diverse clientele, and relentless creativity.' },
]

const aboutStats = [
  { target: 85,  suffix: '+', label: 'Satisfied Clients' },
  { target: 180, suffix: '+', label: 'Brands Joined' },
  { target: 8,   suffix: '+', label: 'Years Experience' },
  { target: 50,  suffix: '+', label: 'Marketing Experts' },
]

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section id="about" ref={ref} style={{ background: 'var(--bg-primary)', padding: '90px 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '72px', alignItems: 'center' }} className="about-grid">

          {/* Left — image in peach circle with floating stat cards */}
          <motion.div
            className="about-visual"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', minHeight: '520px' }}
          >
            {/* Soft circle background */}
            <div className="about-circle" style={{
              width: '550px', height: '550px', borderRadius: '50%',
              background: '#fde0cc',
              position: 'absolute', bottom: '-6px', left: '50%', transform: 'translateX(-50%)',
            }} />

            <img
              className="about-figure"
              src={ABOUT_FIGURE_IMG}
              alt="About Creative Cat"
              style={{ width: '100%', maxWidth: '430px', position: 'relative', zIndex: 1, filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.12))' }}
            />

            {/* Floating stat — left side middle */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', top: '34%', left: '-2%', zIndex: 2,
                background: '#fff', borderRadius: '40px', padding: '12px 24px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: '10px',
              }}
            >
              <div style={{ background: '#fff1e6', borderRadius: '50%', padding: '8px' }}>
                 <svg viewBox="0 0 24 24" width="16" height="16" fill="var(--accent)"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z"/></svg>
              </div>
              <div>
                <div style={{ fontSize: '18px', fontWeight: '800', color: '#000' }}>120%</div>
                <div style={{ color: '#666', fontSize: '11px', fontWeight: '600' }}>Engagement</div>
              </div>
            </motion.div>

            {/* Floating chart card */}
            <motion.div
              className="about-chart-card"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              style={{
                position: 'absolute', top: '30%', right: '2%', zIndex: 2,
              }}
            >
              <img
                src={ABOUT_CHART_IMG}
                alt="Increase sales chart"
                style={{
                  width: '155px',
                  display: 'block',
                  filter: 'drop-shadow(0 10px 28px rgba(0,0,0,0.08))',
                }}
              />
            </motion.div>

            {/* Floating stat — bottom middle/right */}
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', bottom: '10%', right: '6%', zIndex: 2,
                background: '#fff', borderRadius: '40px', padding: '12px 24px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: '10px'
              }}
            >
              <div style={{ background: '#f0f0ff', borderRadius: '50%', padding: '8px' }}>
                 <svg viewBox="0 0 24 24" width="16" height="16" fill="#5b4e9e"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>
              </div>
              <div>
                <div style={{ fontSize: '18px', fontWeight: '800', color: '#000' }}>85%</div>
                <div style={{ color: '#666', fontSize: '11px', fontWeight: '600' }}>Sales Growth</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <span className="section-tag">ABOUT CREATIVE CAT</span>
            <h2 className="section-title">
              8+ Years Of Experience In Digital Marketing
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.8', marginBottom: '32px' }}>
              Our team consists of digital marketing experts who are passionate about helping businesses succeed online.
              We combine creativity, strategy, and technology to deliver measurable results for your brand.
            </p>

            {/* Competency list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
              {competencies.map((item, idx) => (
                <div key={item.title} style={{ 
                  display: 'flex', gap: '20px', alignItems: 'center', 
                  padding: '20px 24px', borderRadius: '60px',
                  background: idx === 1 ? '#f0f0ff' : 'transparent',
                  border: idx !== 1 ? '1px solid #eee' : 'none',
                }}>
                  <div style={{
                    width: '32px', height: '32px', flexShrink: 0,
                    borderRadius: '50%',
                    background: '#e0e0ff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#5b4e9e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontWeight: '800', fontSize: '17px', color: '#000' }}>{item.title}</div>
                    {idx === 1 && <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>{item.sub}</div>}
                  </div>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="about-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
              {aboutStats.map(stat => (
                <div key={stat.label} style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '24px', fontWeight: '800', fontFamily: 'var(--font-heading)',
                    color: 'var(--accent)', lineHeight: 1.1, marginBottom: '4px',
                  }}>
                    <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '11px', fontWeight: '600' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .about-visual { min-height: 390px !important; }
          .about-circle { width: 340px !important; height: 340px !important; bottom: 8px !important; }
          .about-figure { max-width: 280px !important; }
          .about-chart-card { right: 0 !important; top: 24% !important; }
          .about-stats { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
        }
        @media (max-width: 480px) {
          .about-visual { min-height: 300px !important; }
          .about-circle { width: 260px !important; height: 260px !important; }
          .about-figure { max-width: 210px !important; }
          .about-chart-card { display: none !important; }
        }
      `}</style>
    </section>
  )
}
