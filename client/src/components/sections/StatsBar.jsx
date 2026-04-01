import AnimatedCounter from '../ui/AnimatedCounter'

const stats = [
  { target: 85,  suffix: '+', label: 'Satisfied Clients' },
  { target: 180, suffix: '+', label: 'Brands Joined' },
  { target: 85,  suffix: '%', label: 'Sales Growth' },
  { target: 120, suffix: '%', label: 'Total Engagement' },
]

export default function StatsBar() {
  return (
    <section style={{ padding: '0', background: '#f5f7ff', borderTop: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                textAlign: 'center',
                padding: '36px 24px',
                borderRight: i < stats.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none',
              }}
            >
              <div
                style={{
                  fontSize: '38px',
                  fontWeight: '800',
                  fontFamily: 'var(--font-heading)',
                  background: 'var(--gradient-brand)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1.1,
                  marginBottom: '6px',
                }}
              >
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '600' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
