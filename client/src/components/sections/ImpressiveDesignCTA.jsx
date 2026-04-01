import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLocation, useNavigate } from 'react-router-dom'

const BG_IMG = 'https://creativecat.digital/wp-content/uploads/2024/10/Urban-Cut.jpg'

export default function ImpressiveDesignCTA() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const navigate = useNavigate()
  const location = useLocation()

  const handlePortfolioClick = () => {
    if (location.pathname === '/projects') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    navigate('/projects')
  }

  return (
    <section 
      ref={ref}
      style={{ 
        height: '450px', 
        position: 'relative', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        overflow: 'hidden',
        padding: 0
      }}
    >
      {/* Background with overlay */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        backgroundImage: `url(${BG_IMG})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        filter: 'brightness(0.4)'
      }} />
      
      {/* Content */}
      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ 
            fontSize: 'clamp(32px, 5vw, 60px)', 
            fontWeight: '900', 
            color: '#fff', 
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '16px',
            lineHeight: 1.1
          }}
        >
          WE CREATE IMPRESSIVE <br /> DESIGN
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ 
            fontSize: '18px', 
            color: 'rgba(255,255,255,0.9)', 
            marginBottom: '32px',
            fontWeight: '500'
          }}
        >
          We are an experienced agency with powerful resources in creativity
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button 
            className="btn-primary" 
            onClick={handlePortfolioClick}
          >
            Portfolio
          </button>
        </motion.div>
      </div>
    </section>
  )
}
