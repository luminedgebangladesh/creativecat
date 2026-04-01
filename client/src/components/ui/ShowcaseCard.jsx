import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

export default function ShowcaseCard({
  image,
  title,
  description,
  hoverText,
  badge,
  metaTag,
  to,
  ctaLabel = 'View Project',
  primaryColor = '#1f2937',
  secondaryColor = '#5b4e9e',
  aspectRatio = '4 / 3',
  metaVariant = 'compact',
  imageFit = 'cover',
  imagePosition = 'center',
  imageBackground = '#0f1720',
  imagePadding = '0',
}) {
  const frameRef = useRef(null)
  const [pointer, setPointer] = useState({ x: 50, y: 50 })

  const handleMove = (event) => {
    if (!frameRef.current) return
    const bounds = frameRef.current.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width) * 100
    const y = ((event.clientY - bounds.top) / bounds.height) * 100
    setPointer({ x, y })
  }

  const handleLeave = () => {
    setPointer({ x: 50, y: 50 })
  }

  const hoverCopy = hoverText || description
  const Wrapper = to ? Link : 'div'
  const wrapperProps = to ? { to } : {}

  return (
    <article className={`showcase-card showcase-card--${metaVariant}`}>
      <Wrapper
        {...wrapperProps}
        className="showcase-card__surface"
        style={{ textDecoration: 'none' }}
      >
        <div
          ref={frameRef}
          className="showcase-card__media"
          style={{ aspectRatio, background: imageBackground }}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          onBlur={handleLeave}
          data-cursor-link={to ? 'true' : undefined}
        >
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="showcase-card__image"
            style={{ objectFit: imageFit, objectPosition: imagePosition, padding: imagePadding }}
          />

          <div className="showcase-card__shade" />
          <div
            className="showcase-card__brand"
            style={{
              background: `linear-gradient(145deg, ${primaryColor}f2 0%, ${secondaryColor}de 100%)`,
            }}
          />
          <div
            className="showcase-card__spotlight"
            style={{
              background: `radial-gradient(circle at ${pointer.x}% ${pointer.y}%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.14) 18%, transparent 42%)`,
            }}
          />
          <div
            className="showcase-card__tracker"
            style={{
              left: `${pointer.x}%`,
              top: `${pointer.y}%`,
            }}
          />

          {badge && (
            <div className="showcase-card__topbar">
              <span className="showcase-card__badge">{badge}</span>
            </div>
          )}

          <div className="showcase-card__hover-panel">
            {metaTag && <span className="showcase-card__eyebrow">{metaTag}</span>}
            <h3 className="showcase-card__hover-title">{title}</h3>
            {hoverCopy && <p className="showcase-card__hover-copy">{hoverCopy}</p>}
            {to && (
              <span className="showcase-card__cta">
                {ctaLabel}
                <ArrowUpRight size={16} strokeWidth={2.2} />
              </span>
            )}
          </div>
        </div>
      </Wrapper>

      <div className="showcase-card__meta">
        <div className="showcase-card__meta-row">
          <h3 className="showcase-card__meta-title">{title}</h3>
          {metaTag && <span className="showcase-card__meta-tag">{metaTag}</span>}
        </div>
        {description && <p className="showcase-card__meta-copy">{description}</p>}
      </div>
    </article>
  )
}
