import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const CLIENT_PHOTO = 'https://creativecat.digital/wp-content/uploads/2024/05/smiling-middle-eastern-man-in-casual-with-laptop-Y9EY47V-300x300.jpg'

const metrics = [
  { value: '250%', label: '- Follower Growth' },
  { value: '80%',  label: '- Increase Sales' },
  { value: '140%', label: '- Total Engagement' },
  { value: '75%',  label: '- Income growth' },
]

export default function Testimonials() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section id="testimonials" ref={ref} style={{ background: 'var(--dark-bg)' }}>
      <div className="container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '56px' }}
        >
          <span className="section-tag" style={{ background: 'rgba(255,105,0,0.15)', color: '#ff9944' }}>TESTIMONIALS</span>
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: '800', color: '#fff', letterSpacing: '-0.5px' }}>
            What Client Says About Creative Cat
          </h2>
        </motion.div>

        {/* 3-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr 1.4fr', gap: '48px', alignItems: 'center' }} className="testi-grid">

          {/* Left — metrics */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            {metrics.map(m => (
              <div key={m.value}>
                <div style={{ fontSize: '32px', fontWeight: '800', fontFamily: 'var(--font-heading)', color: 'var(--accent)', lineHeight: 1 }}>
                  {m.value}
                </div>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', fontWeight: '500', marginTop: '4px' }}>
                  {m.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Center — client photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div style={{
              width: '280px', height: '320px', borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <img
                src={CLIENT_PHOTO}
                alt="Steve Prosser"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </motion.div>

          {/* Right — quote */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--accent)', marginBottom: '20px', letterSpacing: '0.5px' }}>
              Fantastic Job Done by Creative Cat
            </div>

            {/* Big quote marks */}
            <div style={{ fontSize: '64px', lineHeight: 0.8, color: 'rgba(255,255,255,0.15)', fontFamily: 'var(--font-heading)', marginBottom: '20px' }}>
              "
            </div>

            <blockquote style={{ fontSize: '15px', fontWeight: '400', lineHeight: '1.8', color: 'rgba(255,255,255,0.75)', fontStyle: 'italic', marginBottom: '28px' }}>
              Working with Creative Cat has been a game-changer for our business. Their SEO services
              have helped us rank higher on search engines and attract more organic traffic to our website.
            </blockquote>

            <div>
              <div style={{ fontWeight: '700', fontSize: '16px', color: '#fff' }}>Steve Prosser</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>CEO - Mindtech</div>
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .testi-grid { grid-template-columns: 1fr 1fr !important; }
          .testi-grid > div:first-child { grid-column: 1 / -1; flex-direction: row !important; flex-wrap: wrap; gap: 16px !important; }
        }
        @media (max-width: 600px) {
          .testi-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
