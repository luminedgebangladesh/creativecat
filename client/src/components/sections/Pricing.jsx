import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CheckCircle2, XCircle } from 'lucide-react'
import { plans } from '../../data/pricing'

export default function Pricing() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="pricing" ref={ref} style={{ background: '#fff' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="section-tag">OUR PRICING</span>
          <h2 className="section-title">The Best Price Just For You</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Effective and affordable marketing solutions. Increase your online visibility and drive more traffic.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', alignItems: 'center' }}>
          {plans.map((plan, i) => (
            <motion.div
              key={plan.tier}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              style={{
                padding: plan.isPopular ? '44px 32px' : '36px 32px',
                borderRadius: 'var(--radius-lg)',
                background: plan.isPopular ? '#f0edff' : '#fff',
                border: plan.isPopular ? '2px solid rgba(155,81,224,0.2)' : '1px solid rgba(0,0,0,0.07)',
                boxShadow: plan.isPopular ? '0 20px 60px rgba(155,81,224,0.15)' : 'var(--shadow-card)',
                display: 'flex', flexDirection: 'column',
                position: 'relative', overflow: 'visible',
              }}
            >
              {/* Icon circle */}
              <div style={{
                width: '56px', height: '56px', borderRadius: '50%',
                background: 'var(--accent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '20px',
              }}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                  <line x1="12" y1="12" x2="12" y2="12"/>
                </svg>
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>
                {plan.tier}
              </h3>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '4px' }}>
                <span style={{ fontSize: '48px', fontWeight: '800', fontFamily: 'var(--font-heading)', color: 'var(--accent)' }}>
                  ${plan.price.toLocaleString()}
                </span>
                <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-muted)' }}>
                  / {plan.duration}
                </span>
              </div>

              {/* Gradient divider */}
              <div style={{ height: '4px', background: 'var(--gradient-brand)', borderRadius: '2px', marginBottom: '32px', marginTop: '12px', position: 'relative' }}>
                <div style={{ 
                  width: '12px', height: '12px', borderRadius: '50%', background: '#fff', 
                  position: 'absolute', left: '20%', top: '50%', transform: 'translate(-50%, -50%)', 
                  border: '3px solid var(--accent-purple)',
                  boxShadow: '0 0 10px rgba(155,81,224,0.3)' 
                }} />
              </div>

              {/* Features */}
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px', flexGrow: 1 }}>
                {plan.features.map(feature => (
                  <li key={feature.text} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    {feature.included
                      ? <CheckCircle2 size={16} color="var(--accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      : <XCircle size={16} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
                    }
                    <span style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.5' }}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={plan.isPopular ? "btn-primary" : "btn-dark"}
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Started
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}>
                  <circle cx="12" cy="12" r="10"/><polyline points="12 16 16 12 12 8"/><line x1="8" y1="12" x2="16" y2="12"/>
                </svg>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
