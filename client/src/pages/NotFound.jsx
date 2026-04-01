import { Helmet } from 'react-helmet-async'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <>
      <Helmet><title>404 — Page Not Found | Creative Cat</title></Helmet>
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '24px',
          background: 'var(--bg-primary)',
        }}
      >
        <div
          style={{
            fontSize: '120px',
            fontFamily: 'var(--font-heading)',
            fontWeight: '800',
            color: 'var(--accent)',
            lineHeight: 1,
            marginBottom: '16px',
          }}
        >
          404
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '12px' }}>
          Page Not Found
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', maxWidth: '360px' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a href="/" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <Home size={16} /> Go Home
        </a>
      </div>
    </>
  )
}
