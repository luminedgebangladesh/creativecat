export default function SectionHeading({ tag, title, subtitle, center = false }) {
  return (
    <div style={{ textAlign: center ? 'center' : 'left', marginBottom: '56px' }}>
      {tag && <span className="section-tag">{tag}</span>}
      <h2 className="section-title">{title}</h2>
      {subtitle && (
        <p
          className="section-subtitle"
          style={{ margin: center ? '0 auto' : undefined }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
