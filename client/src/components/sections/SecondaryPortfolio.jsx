import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionHeading from '../ui/SectionHeading'
import { secondaryProjects } from '../../data/portfolio'
import ShowcaseCard from '../ui/ShowcaseCard'

export default function SecondaryPortfolio() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="secondary-portfolio" ref={ref} style={{ background: '#f8f9fc', padding: '80px 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'flex-end', marginBottom: '48px' }} className="sec-port-header">
          <div>
            <SectionHeading
              tag="Creative Services"
              title="More Ways We Help Brands Grow"
              subtitle="Strategy, search, design, and motion support that complements our portfolio work."
              marginBottom="0"
            />
          </div>
          <div style={{ textAlign: 'right' }} className="sec-port-action">
            <a href="/projects/" className="btn-primary" style={{ display: 'inline-block' }}>Explore Project Work</a>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: '28px',
        }} className="sec-port-grid">
          {secondaryProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <ShowcaseCard
                image={project.image}
                title={project.title}
                description={project.description}
                hoverText={project.description}
                badge={project.category}
                metaTag={project.category}
                primaryColor={project.brandColor}
                secondaryColor={project.accentColor}
                aspectRatio="5 / 4"
                metaVariant="compact"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .sec-port-header { grid-template-columns: 1fr !important; text-align: left !important; gap: 20px !important; }
          .sec-port-action { text-align: left !important; }
        }
        @media (max-width: 640px) {
          .sec-port-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
