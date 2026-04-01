import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import emailjs from '@emailjs/browser'
import { Phone, Mail, Building2 } from 'lucide-react'

// ─── EmailJS config ───────────────────────────────────────────
const CONTACT_EMAIL = 'info@creativecat.digital'
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim()
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim()
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim()
const hasEmailJsConfig = Boolean(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY)

function buildMailtoHref({ name, email, subject, message }) {
  const subjectLine = subject?.trim() || 'Project inquiry'
  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    '',
    message?.trim() || '',
  ].join('\n')

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(body)}`
}
// ─────────────────────────────────────────────────────────────

const socialLinks = [
  { label: 'Facebook',  href: 'https://www.facebook.com/creativecat.business/',
    icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="#fff"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
  { label: 'Twitter/X', href: 'https://x.com/CreativeCatBD',
    icon: <svg viewBox="0 0 24 24" width="15" height="15" fill="#fff"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { label: 'Instagram', href: 'https://www.instagram.com/creativecat.digital', // TODO: replace with actual Instagram URL
    icon: <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/company/creativecat-digital', // TODO: replace with actual LinkedIn URL
    icon: <svg viewBox="0 0 24 24" width="15" height="15" fill="#fff"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
]

export default function Contact() {
  const [submitting, setSubmitting] = useState(false)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setSubmitting(true)
    try {
      if (!hasEmailJsConfig) {
        window.location.href = buildMailtoHref(data)
        toast('Opening your email app with this message.')
        return
      }

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name:    data.name,
        from_email:   data.email,
        subject:      data.subject,
        message:      data.message,
        to_email:     CONTACT_EMAIL,
      }, EMAILJS_PUBLIC_KEY)
      toast.success("Message sent! We'll get back to you within 24 hours.")
      reset()
    } catch {
      toast.error(`Failed to send. Please email us directly at ${CONTACT_EMAIL}`)
    } finally {
      setSubmitting(false)
    }
  }

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.12)',
    color: '#fff',
    padding: '14px 18px',
    borderRadius: '8px',
    fontSize: '15px',
    fontFamily: 'var(--font-body)',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  }

  return (
    <section id="contact" ref={ref} style={{ background: '#fff', padding: '90px 0 0' }}>
      <div className="container">

        {/* Section heading */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="section-tag">CONTACT US</span>
            <h2 className="section-title">Get In Touch With Creative Cat</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Explore creativity, ignite passion, and unlock potential. Let's build something great together.
            </p>
          </motion.div>
        </div>

        {/* Main grid — left info + right form */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'start' }} className="contact-grid">

          {/* ── Left: info ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            {/* Office location cards */}
            <div className="contact-inner-cards" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              {/* Khulna */}
              <div style={{
                padding: '20px', borderRadius: '12px',
                border: '1px solid rgba(0,0,0,0.08)',
                background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
              }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,105,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                  <Building2 size={18} color="var(--accent)" />
                </div>
                <div style={{ fontWeight: '800', fontSize: '15px', color: 'var(--text-primary)', marginBottom: '4px' }}>Khulna</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.6' }}>40 Cemetery Rd, Khulna, Bangladesh - 9100</div>
              </div>
              {/* Dhaka */}
              <div style={{
                padding: '20px', borderRadius: '12px',
                border: '1px solid rgba(0,0,0,0.08)',
                background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
              }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,105,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                  <Building2 size={18} color="var(--accent)" />
                </div>
                <div style={{ fontWeight: '800', fontSize: '15px', color: 'var(--text-primary)', marginBottom: '4px' }}>Dhaka</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '13px', fontStyle: 'italic' }}>Coming Soon</div>
              </div>
            </div>

            {/* Phone + Email cards */}
            <div className="contact-inner-cards" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '32px' }}>
              <div style={{
                padding: '20px', borderRadius: '12px',
                border: '1px solid rgba(0,0,0,0.08)',
                background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
              }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,105,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                  <Phone size={18} color="var(--accent)" />
                </div>
                <div style={{ fontWeight: '700', fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Phone</div>
                <a href="tel:+8801833183619" style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: '600' }}>(+88) 01833-183619</a>
              </div>
              <div style={{
                padding: '20px', borderRadius: '12px',
                border: '1px solid rgba(0,0,0,0.08)',
                background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
              }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,105,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                  <Mail size={18} color="var(--accent)" />
                </div>
                <div style={{ fontWeight: '700', fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Email Address</div>
                <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: 'var(--text-primary)', fontSize: '13px', fontWeight: '600' }}>{CONTACT_EMAIL}</a>
              </div>
            </div>

            {/* Social media */}
            <div>
              <p style={{ fontWeight: '700', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '14px' }}>Follow Our Social Media</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                {socialLinks.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    style={{
                      width: '40px', height: '40px', borderRadius: '50%',
                      background: 'var(--accent)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'opacity 0.2s, transform 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right: form ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                background: '#0d1021',
                borderRadius: '16px',
                padding: '36px',
                display: 'flex', flexDirection: 'column', gap: '16px',
              }}
            >
              <input
                style={{ ...inputStyle, borderColor: errors.name ? '#ef4444' : 'rgba(255,255,255,0.12)' }}
                placeholder="Your Name"
                {...register('name', { required: true })}
                onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={e => (e.target.style.borderColor = errors.name ? '#ef4444' : 'rgba(255,255,255,0.12)')}
              />

              <input
                style={{ ...inputStyle, borderColor: errors.email ? '#ef4444' : 'rgba(255,255,255,0.12)' }}
                placeholder="Your Email"
                type="email"
                {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={e => (e.target.style.borderColor = errors.email ? '#ef4444' : 'rgba(255,255,255,0.12)')}
              />

              <input
                style={inputStyle}
                placeholder="Your Subject"
                {...register('subject', { required: true })}
                onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
              />

              <textarea
                style={{ ...inputStyle, resize: 'vertical', minHeight: '140px', borderColor: errors.message ? '#ef4444' : 'rgba(255,255,255,0.12)' }}
                placeholder="Your Message"
                {...register('message', { required: true, minLength: 10 })}
                onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={e => (e.target.style.borderColor = errors.message ? '#ef4444' : 'rgba(255,255,255,0.12)')}
              />

              <button
                type="submit"
                disabled={submitting}
                style={{
                  background: 'var(--accent)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '15px',
                  fontSize: '14px',
                  fontWeight: '800',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  opacity: submitting ? 0.7 : 1,
                  transition: 'opacity 0.2s, transform 0.15s',
                  fontFamily: 'var(--font-body)',
                }}
                onMouseEnter={e => { if (!submitting) e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                {submitting ? 'Sending...' : 'Submit'}
              </button>

              <p style={{ color: 'rgba(255,255,255,0.68)', fontSize: '12px', lineHeight: '1.6' }}>
                If direct sending is unavailable, submit will open your email app with the message prefilled.
              </p>
            </form>
          </motion.div>
        </div>
      </div>

      {/* ── Google Maps ─────────────────────────────────── */}
      <div style={{ marginTop: '72px', height: '380px', overflow: 'hidden' }}>
        <iframe
          title="Creative Cat Location"
          src="https://maps.google.com/maps?q=40+Cemetery+Rd,+Khulna,+Bangladesh+9100&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 'none', display: 'block', filter: 'grayscale(15%)' }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 480px) {
          .contact-inner-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
