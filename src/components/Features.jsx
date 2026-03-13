import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Features.css'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: '🧱',
    title: 'Course Builder',
    desc: 'Drag-and-drop builder for rich multimedia lessons, quizzes, and interactive modules. Publish in minutes.',
    color: '#7c5cfc',
    stat: '2x faster',
  },
  {
    icon: '📈',
    title: 'Progress Tracking',
    desc: 'Monitor every student in real-time. Detailed heatmaps, completion rates, and time-on-task analytics.',
    color: '#22d9a7',
    stat: '99.9% uptime',
  },
  {
    icon: '🧠',
    title: 'Interactive Quizzes',
    desc: 'Adaptive assessments with instant feedback. Auto-graded, spaced-repetition ready, and mobile-first.',
    color: '#c471ed',
    stat: '3M+ answered',
  },
  {
    icon: '📡',
    title: 'Analytics Dashboard',
    desc: 'Actionable insights on revenue, engagement, and learning outcomes. Export to any BI tool seamlessly.',
    color: '#ff8c42',
    stat: 'Live data',
  },
]

export default function Features() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.features__heading', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: '.features__heading', start: 'top 80%' },
      })

      gsap.fromTo('.feature-card', { opacity: 0, y: 60 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.features__grid', start: 'top 80%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="features" ref={sectionRef} className="section features">
      <div className="container">
        <div className="features__heading">
          <div className="section-label">✨ Platform Features</div>
          <h2 className="section-title">
            Everything you need to<br />
            <span className="gradient-text">build & scale learning</span>
          </h2>
          <p className="section-subtitle">
            One platform, infinite possibilities. LearnFlow gives educators and students the tools to achieve transformational outcomes.
          </p>
        </div>

        <div className="features__grid">
          {features.map((f) => (
            <div key={f.title} className="feature-card glass-card">
              <div className="feature-card__top">
                <div className="feature-card__icon-wrap" style={{ '--color': f.color }}>
                  <span className="feature-card__icon">{f.icon}</span>
                </div>
                <span className="feature-card__stat" style={{ color: f.color }}>{f.stat}</span>
              </div>
              <h3 className="feature-card__title">{f.title}</h3>
              <p className="feature-card__desc">{f.desc}</p>
              <div className="feature-card__footer">
                <span className="feature-card__link" style={{ color: f.color }}>Learn more →</span>
                <div className="feature-card__glow" style={{ '--glow': f.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
