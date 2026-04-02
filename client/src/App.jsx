import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { HelmetProvider } from 'react-helmet-async'
import { AnimatePresence, motion } from 'framer-motion'
import CustomCursor from './components/ui/CustomCursor'

const Home          = lazy(() => import('./pages/Home'))
const Projects      = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const NotFound      = lazy(() => import('./pages/NotFound'))

function ScrollToHero() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

const pageVariants = {
  initial: { opacity: 0, y: 14 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 0.61, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Routes location={location}>
          <Route path="/"                element={<Home />} />
          <Route path="/projects"        element={<Projects />} />
          <Route path="/projects/:slug"  element={<ProjectDetail />} />
          <Route path="*"                element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function PageLoader() {
  return (
    <div className="page-loader">
      <div className="page-loader-spinner" />
    </div>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToHero />
        <CustomCursor />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1c1c1c',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.07)',
              fontSize: '14px',
              borderRadius: '8px',
            },
            success: { iconTheme: { primary: '#ff6900', secondary: '#fff' } },
          }}
        />
        <Suspense fallback={<PageLoader />}>
          <AnimatedRoutes />
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  )
}
