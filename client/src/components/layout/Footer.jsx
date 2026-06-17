import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import { MapPin, Phone, Mail } from 'lucide-react'

const LOGO = 'https://creativecat.digital/wp-content/uploads/2024/05/Creative-Cat-Digital-Marketing-Agency-dark@4x.png'

const footerNav = [
  { label: 'Home',             href: 'https://creativecat.digital', external: true },
  { label: 'Work',             href: '#portfolio' },
  { label: 'Brand Guidelines', href: '#brand-guidelines' },
  { label: 'About',            href: '#about' },
  { label: 'Portfolio',        href: '/projects' },
  { label: 'Contact',          href: '#contact' },
]

const quickLinks = [
  { label: 'Privacy Policy',  href: '#contact' },
  { label: 'Term Of Service', href: '#contact' },
  { label: 'Disclaimer',      href: '#contact' },
  { label: 'FAQ',             href: '#faq' },
]

const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/creativecat.business/',
    icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="#fff"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
  { label: 'Twitter/X', href: 'https://x.com/CreativeCatBD',
    icon: <svg viewBox="0 0 24 24" width="15" height="15" fill="#fff"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { label: 'YouTube', href: 'https://www.youtube.com/@CreativeCatBD',
    icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="#fff"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#fff"/></svg> },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/creativecat-digital', // TODO: replace with actual LinkedIn URL
    icon: <svg viewBox="0 0 24 24" width="15" height="15" fill="#fff"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
  { label: 'Instagram', href: 'https://www.instagram.com/creativecat.digital', // TODO: replace with actual Instagram URL
    icon: <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const handleFooterClick = (href) => {
    if (href.startsWith('/')) {
      navigate(href)
      return
    }
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: href } })
      return
    }
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer data-cursor-zone="true" style={{ background: 'var(--dark-bg)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '60px' }}>
      <div className="container">
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', paddingBottom: '48px' }}>

          {/* Brand + contact info card */}
          <div>
            <div style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.16)',
              borderRadius: 'var(--radius-md)',
              padding: '24px', marginBottom: '0',
            }}>
              <a href="/" onClick={e => { e.preventDefault(); handleFooterClick('#home') }} style={{ display: 'inline-block', marginBottom: '20px' }}>
                <img src={LOGO} alt="Creative Cat" style={{ width: '130px', height: 'auto', filter: 'brightness(0) invert(1)' }} />
              </a>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <MapPin size={15} color="var(--accent)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', lineHeight: '1.6' }}>
                    40 Cemetery Rd, Khulna,<br />Bangladesh - 9100
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <Mail size={15} color="var(--accent)" style={{ flexShrink: 0 }} />
                  <a href="mailto:info@creativecat.digital" style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px' }}>
                    info@creativecat.digital
                  </a>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <Phone size={15} color="var(--accent)" style={{ flexShrink: 0 }} />
                  <a href="tel:+8801833183619" style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px' }}>
                    (+88) 01833-183619
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Other Pages */}
          <div>
            <h4 style={{ fontWeight: '700', fontSize: '15px', color: '#fff', marginBottom: '20px' }}>Other Pages</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {footerNav.map(item => (
                <li key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--accent)', fontSize: '12px' }}>›</span>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <a
                      href={item.href.startsWith('/') ? item.href : '#'}
                      onClick={e => { e.preventDefault(); handleFooterClick(item.href) }}
                      style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontWeight: '700', fontSize: '15px', color: '#fff', marginBottom: '20px' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {quickLinks.map(item => (
                <li key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--accent)', fontSize: '12px' }}>›</span>
                  <a
                    href="#"
                    onClick={e => { e.preventDefault(); handleFooterClick(item.href) }}
                    style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter + Social */}
          <div>
            <h4 style={{ fontWeight: '700', fontSize: '15px', color: '#fff', marginBottom: '20px' }}>Newsletter</h4>
            <div className="footer-newsletter-row" style={{ display: 'flex', marginBottom: '8px', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '100px' }}>
              <input
                type="email"
                placeholder="Your Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  flex: 1, background: 'transparent', border: 'none', outline: 'none',
                  color: '#fff', padding: '12px 16px', fontSize: '13px', fontFamily: 'var(--font-body)',
                  borderRadius: '100px 0 0 100px', minWidth: 0,
                }}
              />
              <button
                style={{ background: '#1a1838', color: '#fff', border: 'none', padding: '12px 20px', fontWeight: '600', fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap', borderRadius: '0 100px 100px 0', flexShrink: 0 }}
                onClick={() => {
                  if (!email) return
                  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    toast.error('Please enter a valid email address.')
                    return
                  }
                  toast.success('Thank you for subscribing!')
                  setEmail('')
                }}
              >
                Subscribe
              </button>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginBottom: '24px' }}>Get the latest news &amp; updates</p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {socialLinks.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: '38px', height: '38px', borderRadius: '50%',
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
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '24px 0',
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'space-between', gap: '12px',
        }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>
            Creative Cat – Digital Marketing Agency
          </p>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>
            Copyright © {new Date().getFullYear()} All rights reserved – Creative Cat
          </p>
        </div>
      </div>
      <style>{`
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
          .footer-newsletter-row { flex-direction: column !important; border-radius: 12px !important; overflow: hidden; }
          .footer-newsletter-row input { border-radius: 12px 12px 0 0 !important; }
          .footer-newsletter-row button { border-radius: 0 0 12px 12px !important; width: 100% !important; }
        }
      `}</style>
    </footer>
  )
}
