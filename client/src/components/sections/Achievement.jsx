import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import AnimatedCounter from '../ui/AnimatedCounter'

const achievements = [
  { target: 85,  suffix: '+', label: 'Satisfied Clients' },
  { target: 180, suffix: '+', label: 'Brands Joined' },
  { target: 8,   suffix: '+', label: 'Years Experience' },
  { target: 50,  suffix: '+', label: 'Marketing Experts' },
]

export default function Achievement() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section id="achievement" ref={ref} style={{ background: '#f8f9fc', padding: '100px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span className="section-tag">Achievement</span>
          <h2 className="section-title">Some Number Of Our Achievement</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Helping businesses improve their online presence
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '30px', 
          padding: '40px',
          background: '#fff',
          borderRadius: '20px',
          boxShadow: '0 10px 40px rgba(15, 13, 46, 0.05)'
        }} className="achievement-grid">
          {achievements.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{ 
                fontSize: '44px', 
                fontWeight: '900', 
                fontFamily: 'var(--font-heading)', 
                color: 'var(--accent)',
                marginBottom: '10px'
              }}>
                <AnimatedCounter target={item.target} suffix={item.suffix} />
              </div>
              <p style={{ 
                fontSize: '15px', 
                fontWeight: '700', 
                color: 'var(--text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 992px) {
          .achievement-grid { grid-template-columns: repeat(2, 1fr) !important; padding: 30px !important; }
        }
        @media (max-width: 600px) {
          .achievement-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
