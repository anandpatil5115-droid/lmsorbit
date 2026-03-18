import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './Hero.css'

export default function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.8 })

      tl.fromTo('.hero__title', 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      )
      .fromTo('.hero__subtitle', 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 
        '-=0.6'
      )
      .fromTo('.hero__cta', 
        { opacity: 0, scale: 0.95 }, 
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }, 
        '-=0.4'
      )

      // Mouse move parallax for text depth
      const onMove = (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20
        const y = (e.clientY / window.innerHeight - 0.5) * 15
        gsap.to('.hero__content', { 
          x: x * 0.5, 
          y: y * 0.5, 
          duration: 1.5, 
          ease: 'power2.out' 
        })
      }
      
      window.addEventListener('mousemove', onMove)
      return () => window.removeEventListener('mousemove', onMove)
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="hero-section">
      <div className="container hero-container">
        <div className="hero__content">
          <h1 className="hero__title">
            Effortless<br />
            learning management<br />
            <span className="hero__title-accent">for education</span>
          </h1>
          
          <p className="hero__subtitle">
            Streamline your courses, engage students effortlessly, and track progress in real-time. 
            We handle the heavy lifting so you can focus on teaching.
          </p>
          
          <div className="hero__cta">
            <button className="cta-button">
              START LEARNING
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
