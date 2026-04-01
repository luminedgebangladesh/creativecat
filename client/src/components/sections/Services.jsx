import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { services } from '../../data/services'

export default function Services() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="services" ref={ref} style={{ background: 'var(--dark-bg)' }}>
      <div className="container">
        {/* Heading inline for dark section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '56px' }}
        >
          <span className="section-tag" style={{ background: 'rgba(255,105,0,0.15)', color: '#ff9944' }}>OUR SERVICES</span>
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: '800', color: '#fff', marginBottom: '16px', letterSpacing: '-0.5px' }}>
            We Provide The Best Service For You
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', lineHeight: '1.8', maxWidth: '540px', margin: '0 auto' }}>
            We offer a wide range of digital marketing services that cater to businesses of all sizes.
          </p>
        </motion.div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '30px' 
        }} className="services-grid">
          {services.map((service, i) => {
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{
                  padding: '50px 40px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: '20px',
                  transition: 'all 0.4s ease',
                }}
                whileHover={{ 
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderColor: 'rgba(255, 105, 0, 0.3)',
                  transform: 'translateY(-10px)' 
                }}
              >
                <div style={{
                  width: '80px', height: '80px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '10px',
                }}>
                  <img 
                    src={service.icon} 
                    alt={service.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                  />
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#fff' }}>
                  {service.title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: '1.7', flexGrow: 1 }}>
                  {service.description}
                </p>
                <a
                  href="#contact"
                  onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    color: '#fff', 
                    fontSize: '14px', 
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginTop: '20px'
                  }}
                >
                  Read More 
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </a>
              </motion.div>
            )
          })}
        </div>
      </div>
      <style>{`
        @media (max-width: 992px) {
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
