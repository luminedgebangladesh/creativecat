import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { faqs } from '../../data/faq'

function AccordionRow({ question, answer, isOpen, onToggle }) {
  return (
    <div style={{ borderBottom: '1px solid rgba(0,0,0,0.07)', overflow: 'hidden' }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '18px 20px', background: isOpen ? 'rgba(255,105,0,0.04)' : 'transparent',
          border: 'none', textAlign: 'left', cursor: 'pointer', gap: '16px',
          borderLeft: isOpen ? '3px solid var(--accent)' : '3px solid transparent',
          transition: 'all 0.2s',
        }}
      >
        <span style={{ 
          fontSize: '16px', 
          fontWeight: '700', 
          color: isOpen ? 'var(--accent)' : '#0f172a', 
          lineHeight: '1.4',
          fontFamily: 'var(--font-heading)'
        }}>
          {question}
        </span>
        {/* Orange triangle icon */}
        <span style={{
          flexShrink: 0,
          width: 0, height: 0,
          borderStyle: 'solid',
          borderWidth: isOpen ? '8px 6px 0 6px' : '6px 0 6px 10px',
          borderColor: isOpen
            ? 'var(--accent) transparent transparent transparent'
            : 'transparent transparent transparent var(--accent)',
          transition: 'all 0.3s',
        }} />
      </button>

      <div style={{
        maxHeight: isOpen ? '500px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.35s ease',
      }}>
        <p style={{ 
          color: '#52576e', 
          fontSize: '15px', 
          lineHeight: '1.8', 
          padding: '0 24px 24px 24px' 
        }}>
          {answer}
        </p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openId, setOpenId] = useState(1)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="faq" ref={ref} style={{ background: '#fff' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <span className="section-tag">FAQ</span>
          <h2 className="section-title">Frequently Asked Questions About Digital Marketing Agencies</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Have questions? We've got answers. If you don't find what you're looking for, feel free to contact us.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            maxWidth: '860px', margin: '0 auto',
            background: '#fff', borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(0,0,0,0.07)',
            boxShadow: 'var(--shadow-card)',
            overflow: 'hidden',
          }}
        >
          {faqs.map(faq => (
            <AccordionRow
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openId === faq.id}
              onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
            />
          ))}
        </motion.div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button
            className="btn-primary"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Ask Us Anything
          </button>
        </div>
      </div>
    </section>
  )
}
