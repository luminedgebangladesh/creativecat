import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'

const LOGO_URL = '/logo.svg'

const navLinks = [
  { label: 'Work',            href: '#portfolio' },
  { label: 'Brand Guidelines', href: '#brand-guidelines' },
  { label: 'About',           href: '#about' },
  { label: 'All Projects',    href: '/projects' },
  { label: 'Contact',         href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (href) => {
    setMenuOpen(false)
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
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.7)',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
        boxShadow: scrolled ? '0 12px 30px rgba(9,20,44,0.10)' : 'none',
        backdropFilter: 'blur(14px)',
        transition: 'box-shadow 0.25s, background 0.25s',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '72px',
        }}
      >
        {/* Logo */}
        <a
          href="/"
          onClick={e => { e.preventDefault(); handleNavClick('#home') }}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <img
            src={LOGO_URL}
            alt="Creative Cat Digital Marketing Agency"
            style={{ height: '38px', width: 'auto' }}
          />
        </a>

        {/* Desktop Nav */}
        <nav className="desktop-nav" style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link"
              data-cursor-link="true"
              onClick={e => { e.preventDefault(); handleNavClick(link.href) }}
              style={{
                color: '#0f0f14',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'color 0.2s',
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a
            href="tel:+8801833183619"
            className="phone-link"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              color: '#0f0f14',
              fontSize: '15px',
              fontWeight: '600',
              fontFamily: 'var(--font-heading)',
            }}
          >
            <span style={{ 
              background: 'var(--accent)',
              borderRadius: '50%', 
              padding: '6px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: '#fff'
            }}>
              <Phone size={14} />
            </span>
            (+88) 01833-183619
          </a>
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="hamburger"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#0f0f14',
              padding: '4px',
              display: 'none',
            }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div style={{ background: '#fff', borderTop: '1px solid rgba(0,0,0,0.08)', padding: '16px 24px 24px' }}>
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={e => { e.preventDefault(); handleNavClick(link.href) }}
              style={{
                display: 'block',
                color: '#0f0f14',
                fontSize: '15px',
                fontWeight: '500',
                padding: '12px 0',
                borderBottom: '1px solid rgba(0,0,0,0.07)',
              }}
            >
              {link.label}
            </a>
          ))}
          <a href="tel:+8801833183619" style={{ display: 'block', color: 'var(--accent)', fontSize: '14px', marginTop: '16px' }}>
            (+88) 01833-183619
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .phone-link  { display: none !important; }
          .hamburger   { display: flex !important; }
        }
        @media (min-width: 901px) {
          .hamburger { display: none !important; }
        }
      `}</style>
    </header>
  )
}
