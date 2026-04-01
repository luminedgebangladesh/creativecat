import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'

const LOGO_URL = '/logo.svg'

const navLinks = [
  { label: 'Work',             href: '#portfolio' },
  { label: 'Brand Guidelines', href: '#brand-guidelines' },
  { label: 'About',            href: '#about' },
  { label: 'All Projects',     href: '/projects' },
  { label: 'Contact',          href: '#contact' },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const headerRef = useRef(null)
  const navigate  = useNavigate()
  const location  = useLocation()

  // Scroll → frosted glass effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close drawer when viewport widens past 900 px
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 900) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Close drawer on outside click
  useEffect(() => {
    const onPointerDown = (e) => {
      if (menuOpen && headerRef.current && !headerRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [menuOpen])

  const handleNavClick = (href) => {
    setMenuOpen(false)
    if (href.startsWith('/')) { navigate(href); return }
    if (location.pathname !== '/') { navigate('/', { state: { scrollTo: href } }); return }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const isActive = (href) => href === '/projects' && location.pathname === '/projects'

  return (
    <header
      ref={headerRef}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
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
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}
      >
        {/* Logo */}
        <a href="/" onClick={e => { e.preventDefault(); handleNavClick('#home') }} style={{ display: 'flex', alignItems: 'center' }}>
          <img src={LOGO_URL} alt="Creative Cat Digital Marketing Agency" style={{ height: '38px', width: 'auto' }} />
        </a>

        {/* Desktop Nav */}
        <nav className="desktop-nav" style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className={`nav-link${isActive(link.href) ? ' nav-link--active' : ''}`}
              data-cursor-link="true"
              onClick={e => { e.preventDefault(); handleNavClick(link.href) }}
              style={{
                fontSize: '14px',
                fontWeight: isActive(link.href) ? '700' : '500',
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right — phone + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingRight: '12px' }}>
          <a
            href="tel:+8801833183619"
            className="phone-link"
            style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#0f0f14', fontSize: '15px', fontWeight: '600', fontFamily: 'var(--font-heading)' }}
          >
            <span style={{ background: 'var(--accent)', borderRadius: '50%', padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <Phone size={14} />
            </span>
            (+88) 01833-183619
          </a>

          <button
            onClick={() => setMenuOpen(v => !v)}
            className="hamburger"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            style={{ background: 'transparent', border: 'none', color: '#0f0f14', padding: '4px', display: 'none' }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer — always rendered, animated via max-height */}
      <div
        style={{
          maxHeight: menuOpen ? '420px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          background: '#fff',
          borderTop: menuOpen ? '1px solid rgba(0,0,0,0.08)' : 'none',
        }}
      >
        <div style={{ padding: '20px 24px 28px' }}>
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className={`mobile-nav-link${isActive(link.href) ? ' mobile-nav-link--active' : ''}`}
              onClick={e => { e.preventDefault(); handleNavClick(link.href) }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '15px',
                fontWeight: isActive(link.href) ? '700' : '500',
                padding: '13px 0',
                borderBottom: '1px solid rgba(0,0,0,0.06)',
              }}
            >
              {link.label}
              {isActive(link.href) && (
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
              )}
            </a>
          ))}
          <a
            href="tel:+8801833183619"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', fontSize: '14px', fontWeight: '600', marginTop: '20px' }}
          >
            <Phone size={14} />
            (+88) 01833-183619
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .phone-link  { display: none !important; }
          .hamburger   { display: flex !important; }
        }
        @media (min-width: 901px) {
          .hamburger { display: none !important; }
        }

        /* Mobile nav link hover effect */
        .mobile-nav-link {
          color: #0f0f14;
          text-decoration: none;
          transition: color 0.2s ease, padding-left 0.2s ease;
        }
        .mobile-nav-link:hover {
          color: var(--accent);
          padding-left: 6px;
        }
        .mobile-nav-link--active {
          color: var(--accent);
          font-weight: 700;
        }
      `}</style>
    </header>
  )
}
