import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ScrollToTop from '../components/layout/ScrollToTop'
import Hero from '../components/sections/Hero'
import Portfolio from '../components/sections/Portfolio'
import SelectedWork from '../components/sections/SelectedWork'
import BrandGuidelines from '../components/sections/BrandGuidelines'
import About from '../components/sections/About'
import FAQ from '../components/sections/FAQ'
import SecondaryPortfolio from '../components/sections/SecondaryPortfolio'
import Contact from '../components/sections/Contact'

export default function Home() {
  const location = useLocation()

  const scrollTarget = location.state?.scrollTo
  useEffect(() => {
    if (scrollTarget) {
      const timer = setTimeout(() => {
        const el = document.querySelector(scrollTarget)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 120)
      return () => clearTimeout(timer)
    }
  }, [scrollTarget])

  return (
    <>
      <Helmet>
        <title>Creative Cat — Digital Marketing Agency | Khulna, Bangladesh</title>
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
        <meta
          name="description"
          content="Creative Cat is a top-notch digital marketing agency in Khulna, Bangladesh. We offer SEO, Paid Ads, Graphic Design, Video Editing, Branding, and Social Media services."
        />
        <meta property="og:title" content="Creative Cat — Digital Marketing Agency" />
        <meta property="og:description" content="Where Imagination Meets Innovation. Grow your business with Creative Cat." />
        <meta name="theme-color" content="#ff6900" />
      </Helmet>

      <Navbar />

      <main>
        <Hero />
        <SelectedWork />
        <Portfolio />
        <SecondaryPortfolio />
        <BrandGuidelines />
        <About />
        <FAQ />
        <Contact />
      </main>

      <Footer />
      <ScrollToTop />
    </>
  )
}
