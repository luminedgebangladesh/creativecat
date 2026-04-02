import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ScrollToTop from '../components/layout/ScrollToTop'
import ImpressiveDesignCTA from '../components/sections/ImpressiveDesignCTA'
import Achievement from '../components/sections/Achievement'
import ShowcaseCard from '../components/ui/ShowcaseCard'
import { projects, creativeServicesPrimary, creativeServicesSecondary } from '../data/portfolio'

export default function Projects() {
  const navigate = useNavigate()

  const handleContactClick = () => {
    navigate('/', { state: { scrollTo: '#contact' } })
  }

  return (
    <>
      <Helmet>
        <title>Our Projects - Creative Cat Digital Marketing Agency</title>
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
        <meta name="description" content="Explore Creative Cat's portfolio of branding, design, video editing, SEO, and digital marketing projects." />
      </Helmet>

      <Navbar />

      <main style={{ paddingTop: '72px' }}>
        <section style={{ background: '#fff', padding: '64px 0 48px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <span className="section-tag">OUR WORK</span>
            <h1 className="section-title">Projects We Have Done</h1>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              A showcase of brands we've helped build, grow, and transform through creative digital marketing.
            </p>
          </div>
        </section>

        <section style={{ background: '#fff', padding: '36px 0 72px' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '30px' }} className="portfolio-grid">
              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                >
                  <ShowcaseCard
                    to={`/projects/${project.slug}`}
                    image={project.image}
                    title={project.title}
                    description={project.description}
                    hoverText={project.tagline}
                    badge={project.category}
                    metaTag={project.category}
                    primaryColor={project.brandColor}
                    secondaryColor={project.accentColor}
                    aspectRatio="4 / 3"
                    metaVariant="detail"
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
        </section>

        <ImpressiveDesignCTA />

        <section style={{ background: '#f8f9fc', padding: '80px 0' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <span className="section-tag">OUR SERVICES</span>
              <h2 className="section-title">More Ways We Support Brands</h2>
            </div>
            <div className="sec-port-grid-row1">
              {creativeServicesPrimary.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
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
            <div className="sec-port-grid-row2">
              {creativeServicesSecondary.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (creativeServicesPrimary.length + i) * 0.08 }}
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
        </section>

        <section style={{ background: 'linear-gradient(135deg, #0d1117 0%, #1a1e2e 100%)', padding: '80px 0', textAlign: 'center' }}>
          <div className="container">
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '800', color: '#fff', marginBottom: '16px' }}>
              Need Advice For Your Digital Marketing?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', maxWidth: '600px', margin: '0 auto 32px' }}>
              Drive growth, engage audiences, boost ROI. Your digital journey starts here.
            </p>
            <button className="btn-primary" onClick={handleContactClick}>
              Contact Us
            </button>
          </div>
        </section>

        <Achievement />
      </main>

      <Footer />
      <ScrollToTop />

      <style>{`
        .sec-port-grid-row1 {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 28px;
          margin-bottom: 28px;
        }
        .sec-port-grid-row2 {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 28px;
        }
        @media (max-width: 1100px) {
          .sec-port-grid-row1 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .sec-port-grid-row2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 768px) {
          .portfolio-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .sec-port-grid-row1,
          .sec-port-grid-row2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
