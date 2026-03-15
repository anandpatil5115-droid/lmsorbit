import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Features.css'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: '⚡',
    title: 'Lightning Fast',
    desc: 'Process thousands of requests per second with our distributed edge architecture.',
    color: '#00F0FF',
    stat: '10x Faster',
  },
  {
    icon: '🧠',
    title: 'Neural Engine',
    desc: 'Self-learning models that adapt to your specific business logic and communication style.',
    color: '#7C3AED',
    stat: '99.9% Uptime',
  },
  {
    icon: '🔒',
    title: 'Enterprise Security',
    desc: 'Bank-grade encryption, SOC2 certified, and completely private by design.',
    color: '#00F0FF',
    stat: 'Secure',
  },
  {
    icon: '📡',
    title: 'Analytics Edge',
    desc: 'Actionable insights on API usage and neural pathways. Export to any BI tool seamlessly.',
    color: '#7C3AED',
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
            Next-Gen<br />
            <span className="gradient-text">Capabilities</span>
          </h2>
          <p className="section-subtitle">
            One platform, infinite possibilities. LearnFlow gives educators the tools to achieve transformational outcomes.
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
