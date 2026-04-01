import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Clock, DollarSign, Target, Heart } from 'lucide-react'

const reasons = [
  { icon: Clock,       title: 'Save Your Time',    description: 'Save time with us: efficient, reliable service and innovative solutions for you.' },
  { icon: DollarSign,  title: 'Affordable For You', description: 'Quality service at affordable prices. Exceptional value without compromising on excellence.' },
  { icon: Target,      title: 'Best Strategy',      description: 'Strategize: Consistent, adaptable, deliberate actions toward long-term goals with foresight.' },
]

export default function WhyChooseUs() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="whychooseus" ref={ref} style={{ background: 'var(--dark-bg)', padding: '80px 0' }}>
      <div className="container">
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '0' }}
          className="why-grid"
        >
          {/* Left text column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{ padding: '40px 32px 40px 0', borderRight: '1px solid rgba(255,255,255,0.08)' }}
          >
            <h2 style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: '800', color: '#fff', marginBottom: '16px', lineHeight: '1.2' }}>
              Why Choose Us
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: '1.8' }}>
              Choose us for quality, innovation, customer focus, competitive pricing, sustainability, and proven excellence. Experience the difference.
            </p>
          </motion.div>

          {/* Feature cards */}
          {reasons.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: (i + 1) * 0.1 }}
                style={{
                  padding: '40px 28px',
                  background: 'transparent',
                  borderRight: i < reasons.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  borderLeft: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div style={{
                  width: '52px', height: '52px', borderRadius: '50%',
                  background: 'rgba(255,105,0,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '20px',
                }}>
                  <Icon size={22} color="var(--accent)" />
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#fff', marginBottom: '10px' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', lineHeight: '1.7' }}>
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .why-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .why-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
