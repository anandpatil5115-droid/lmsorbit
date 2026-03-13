import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './CTA.css'

gsap.registerPlugin(ScrollTrigger)

export default function CTA() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cta__content', { opacity: 0, y: 60 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.cta__content', start: 'top 80%' },
      })

      // Animate orbs
      gsap.to('.cta__orb-1', { x: 30, y: -20, duration: 6, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      gsap.to('.cta__orb-2', { x: -25, y: 25, duration: 8, ease: 'sine.inOut', yoyo: true, repeat: -1 })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section cta">
      <div className="cta__orb cta__orb-1" />
      <div className="cta__orb cta__orb-2" />

      <div className="container">
        <div className="cta__content" style={{ opacity: 0 }}>
          <div className="section-label">🚀 Get Started Today</div>
          <h2 className="cta__title">
            Start Your<br />
            <span className="gradient-text">Learning Journey</span><br />
            Today
          </h2>
          <p className="cta__subtitle">
            Join 50,000+ students and instructors who are already transforming the way they learn and teach.
            Your first 14 days are completely free.
          </p>
          <div className="cta__buttons">
            <a href="#" className="btn btn-primary cta__btn-main">
              <span>🎓 Start Learning — It's Free</span>
            </a>
            <a href="#" className="btn btn-ghost">
              📖 View All Courses
            </a>
          </div>

          <div className="cta__trust">
            {['No credit card needed', '14-day free trial', 'Cancel anytime'].map(t => (
              <div key={t} className="cta__trust-item">
                <span className="cta__check">✓</span>
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
