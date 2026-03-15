import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './Hero.css'

const floatingCards = [
  { icon: '📊', label: 'Analytics', value: '+247%', pos: 'card-a' },
  { icon: '🎓', label: 'Students', value: '12,400', pos: 'card-b' },
  { icon: '⭐', label: 'Completion Rate', value: '94%', pos: 'card-c' },
  { icon: '🏆', label: 'Top Course', value: 'Python AI', pos: 'card-d' },
]

export default function Hero() {
  const heroRef = useRef(null)
  const orb1Ref = useRef(null)
  const orb2Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation timeline
      const tl = gsap.timeline({ delay: 0.2 })

      tl.fromTo('.hero__label', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
        .fromTo('.hero__title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.4')
        .fromTo('.hero__subtitle', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
        .fromTo('.hero__ctas', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .fromTo('.hero__stat', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out' }, '-=0.3')
        .fromTo('.float-card', { opacity: 0, scale: 0.8, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'back.out(1.7)' }, '-=0.5')

      // Floating animation for cards
      gsap.to('.float-card', {
        y: -12,
        duration: 2.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.4, from: 'random' },
      })

      // Orbs drifting
      gsap.to(orb1Ref.current, { x: 60, y: -40, duration: 8, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      gsap.to(orb2Ref.current, { x: -50, y: 60, duration: 10, ease: 'sine.inOut', yoyo: true, repeat: -1 })

      // Parallax on mouse move
      const onMove = (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30
        const y = (e.clientY / window.innerHeight - 0.5) * 20
        gsap.to('.hero__visual', { rotateY: x * 0.3, rotateX: -y * 0.3, duration: 1.2, ease: 'power2.out' })
        gsap.to(orb1Ref.current, { x: x * 1.5, y: y * 1.5, duration: 2, ease: 'power2.out' })
      }
      window.addEventListener('mousemove', onMove)
      return () => window.removeEventListener('mousemove', onMove)
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="hero section noise">
      <div className="grid-bg" />
      <div ref={orb1Ref} className="hero__orb hero__orb-1" />
      <div ref={orb2Ref} className="hero__orb hero__orb-2" />

      <div className="container hero__inner">
        {/* Text Side */}
        <div className="hero__content">
          <div className="section-label hero__label">
            🚀 The Future of Learning is Here
          </div>

          <h1 className="hero__title">
            <span style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(72px, 9vw, 120px)',
              color: 'transparent',
              WebkitTextStroke: '2px #1e1b4b',
              display: 'block',
              lineHeight: 0.95,
              letterSpacing: '-1px'
            }}>Learn</span>
            <span style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(72px, 9vw, 120px)',
              color: '#7c3aed',
              display: 'block',
              lineHeight: 0.95,
              letterSpacing: '-1px',
              fontStyle: 'italic'
            }}>Without</span>
            <span style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(72px, 9vw, 120px)',
              color: '#0f0a1e',
              display: 'block',
              lineHeight: 0.95,
              letterSpacing: '-1px'
            }}>Limits</span>
          </h1>

          <p className="hero__subtitle" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', color: '#475569', lineHeight: 1.7 }}>
            Build world-class courses, track every student's journey,
            and unlock real-time analytics — all from one intelligent platform.
          </p>

          <div className="hero__ctas">
            <a href="#" className="btn btn-primary">
              <span>🎓 Start Learning</span>
            </a>
            <a href="#" className="btn btn-ghost">
              ✏️ Create a Course
            </a>
          </div>

          <div className="hero__stats">
            {[
              { n: '50K+', label: 'Active Learners' },
              { n: '2K+', label: 'Courses' },
              { n: '98%', label: 'Satisfaction' },
            ].map(s => (
              <div key={s.label} className="hero__stat">
                <span className="hero__stat-num" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '40px', color: '#0f0a1e' }}>{s.n}</span>
                <span className="hero__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Side */}
        <div className="hero__visual">
          <div className="hero__dashboard glass-card">
            <div className="hero__dash-header">
              <span className="dash-dot dash-dot--red" />
              <span className="dash-dot dash-dot--yellow" />
              <span className="dash-dot dash-dot--green" />
              <span className="dash-title">LearnFlow Dashboard</span>
            </div>
            <div className="hero__dash-body">
              <div className="dash-chart">
                {[60, 80, 45, 90, 70, 95, 55, 85].map((h, i) => (
                  <div key={i} className="dash-bar" style={{ '--h': `${h}%`, '--delay': `${i * 0.1}s` }} />
                ))}
              </div>
              <div className="dash-courses">
                {[
                  { name: 'UI/UX Design', prog: 78, color: '#7c5cfc' },
                  { name: 'Python Basics', prog: 55, color: '#22d9a7' },
                  { name: 'Data Science', prog: 92, color: '#c471ed' },
                ].map(c => (
                  <div key={c.name} className="dash-course-item">
                    <div className="dash-course-info">
                      <span style={{ fontSize: '0.75rem' }}>{c.name}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{c.prog}%</span>
                    </div>
                    <div className="dash-progress-bar">
                      <div className="dash-progress-fill" style={{ '--w': `${c.prog}%`, '--color': c.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {floatingCards.map(card => (
            <div key={card.label} className={`float-card float-card--${card.pos}`}>
              <span className="float-card__icon">{card.icon}</span>
              <div>
                <div className="float-card__value">{card.value}</div>
                <div className="float-card__label">{card.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero__scroll-hint">
        <span>Scroll to explore</span>
        <span className="hero__scroll-arrow">↓</span>
      </div>
    </section>
  )
}
