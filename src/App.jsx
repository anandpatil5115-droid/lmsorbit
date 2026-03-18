import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Courses from './components/Courses'
import Demo from './components/Demo'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import CTA from './components/CTA'
import Footer from './components/Footer'
import SplineBackground from './components/SplineBackground'

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <div className="app" style={{ background: '#000' }}>
      <SplineBackground />
      <div className="content-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 10 }}>
        <Navbar />
        <Hero />
        <Features />
        <Courses />
        <Demo />
        <Testimonials />
        <Pricing />
        <CTA />
        <Footer />
      </div>
    </div>
  )
}

export default App
