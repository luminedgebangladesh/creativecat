import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const deliverables = [
  { title: 'Logo system', desc: 'Clear rules for logo usage, spacing, and safe zones.' },
  { title: 'Color & type', desc: 'Primary/secondary palette and typography pairing for consistency.' },
  { title: 'Brand voice', desc: 'Messaging principles + tone examples for posts and campaigns.' },
  { title: 'Social templates', desc: 'Reusable layouts for feeds, reels covers, and stories.' },
  { title: 'Visual do & don’t', desc: 'Practical examples to keep your brand clean and recognizable.' },
  { title: 'Handoff kit', desc: 'A ready-to-use folder for teams, designers, and editors.' },
]

export default function BrandGuidelines() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.12 })

  return (
    <section id="brand-guidelines" ref={ref} style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '32px', alignItems: 'start' }} className="bg-grid">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="section-tag">BRAND GUIDELINES</span>
            <h2 className="section-title" style={{ maxWidth: '20ch' }}>
              Make your brand consistent across every platform.
            </h2>
            <p className="section-subtitle" style={{ maxWidth: '62ch' }}>
              Brand guidelines are the foundation of a premium portfolio and high-performing marketing.
              We build a simple, usable system your team can follow — so everything looks and feels “on brand”.
            </p>

            <div style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button className="btn-primary" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Get Brand Guidelines
              </button>
              <button className="btn-dark" onClick={() => document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })}>
                See Brand Work
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="surface"
            style={{ padding: '22px', background: '#fff' }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '12px', marginBottom: '14px' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, letterSpacing: '-0.6px', fontSize: '18px' }}>
                What you get
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>
                Practical, not “PDF decoration”
              </div>
            </div>
            <div className="hairline" style={{ marginBottom: '16px' }} />
            <ul style={{ listStyle: 'none', display: 'grid', gap: '14px' }}>
              {deliverables.map((d) => (
                <li key={d.title} style={{ display: 'grid', gap: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                      width: '10px', height: '10px', borderRadius: '50%',
                      background: 'var(--gradient-brand)',
                      boxShadow: '0 10px 26px rgba(255,105,0,0.22)',
                      flexShrink: 0,
                    }} />
                    <span style={{ fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>{d.title}</span>
                  </div>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.7 }}>{d.desc}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .bg-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

