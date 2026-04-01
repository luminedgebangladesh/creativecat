import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { projects } from '../../data/portfolio'
import ShowcaseCard from '../ui/ShowcaseCard'

export default function SelectedWork() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const featured = projects.slice(0, 4)

  return (
    <section ref={ref} style={{ background: '#f7f8ff', padding: '80px 0' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '32px', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '999px', background: 'var(--accent)' }} />
              Selected Work
            </div>
            <h2 className="section-title">
              Work that <br />
              <span className="gradient-text" style={{ fontStyle: 'italic', fontWeight: 700 }}>makes us proud</span>
            </h2>
          </div>
          <Link
            to="/projects"
            className="btn-outline"
            style={{ display: 'inline-flex' }}
          >
            View all projects
          </Link>
        </div>

        <div
          className="selected-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '22px',
          }}
        >
          {featured.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <ShowcaseCard
                to={`/projects/${project.slug}`}
                image={project.image}
                title={project.title}
                description={project.tagline}
                hoverText={project.description}
                badge={project.category}
                metaTag={project.category}
                primaryColor={project.brandColor}
                secondaryColor={project.accentColor}
                aspectRatio="4 / 3"
                metaVariant="compact"
                ctaLabel="View Project"
                imageFit={project.cardFit}
                imagePosition={project.cardPosition}
                imageBackground={project.cardBackground}
                imagePadding={project.cardPadding}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .selected-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
