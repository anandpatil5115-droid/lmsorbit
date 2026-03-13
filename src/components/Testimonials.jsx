import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Testimonials.css'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Senior UX Designer',
    company: 'Accenture',
    avatar: 'SM',
    color: '#7c5cfc',
    rating: 5,
    text: 'LearnFlow completely transformed how our team upskills. The course builder is intuitive, and analytics give us exactly the insights we need to improve outcomes.',
  },
  {
    name: 'Daniel Okafor',
    role: 'Python Instructor',
    company: 'Indie Creator',
    avatar: 'DO',
    color: '#22d9a7',
    rating: 5,
    text: 'I launched my first course in 2 hours. After 3 months I had 4,000 students and $18K in revenue. The platform handles everything so I can focus on teaching.',
  },
  {
    name: 'Priya Nair',
    role: 'L&D Director',
    company: 'FinEdge Corp',
    avatar: 'PN',
    color: '#c471ed',
    rating: 5,
    text: 'We migrated from a legacy LMS and the difference is night and day. Student engagement went up 170%. The onboarding team was incredibly supportive.',
  },
  {
    name: 'Marcus Chen',
    role: 'Data Science Student',
    company: 'Self-Learner',
    avatar: 'MC',
    color: '#ff8c42',
    rating: 5,
    text: 'The adaptive quizzes keep me sharp and the progress tracking motivates me daily. I completed a 40-hour bootcamp in 6 weeks with top scores.',
  },
  {
    name: 'Elena Vasquez',
    role: 'Head of Education',
    company: 'TechUp Labs',
    avatar: 'EV',
    color: '#7c5cfc',
    rating: 5,
    text: 'LearnFlow integrates perfectly with our HR stack. Automated certificates, SSO, and Slack notifications make administration effortless for our 500-employee org.',
  },
]

export default function Testimonials() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [current, setCurrent] = useState(0)

  const visibleCount = 3
  const maxIndex = testimonials.length - visibleCount

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.test__head', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: '.test__head', start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const slideTo = (idx) => {
    const clamped = Math.max(0, Math.min(idx, maxIndex))
    setCurrent(clamped)
    gsap.to(trackRef.current, { x: `-${clamped * (100 / visibleCount)}%`, duration: 0.7, ease: 'power3.out' })
  }

  // Auto-advance
  useEffect(() => {
    const t = setInterval(() => {
      setCurrent(c => {
        const next = c >= maxIndex ? 0 : c + 1
        gsap.to(trackRef.current, { x: `-${next * (100 / visibleCount)}%`, duration: 0.7, ease: 'power3.out' })
        return next
      })
    }, 4000)
    return () => clearInterval(t)
  }, [maxIndex])

  return (
    <section id="testimonials" ref={sectionRef} className="section testimonials">
      <div className="container">
        <div className="test__head" style={{ opacity: 0 }}>
          <div className="section-label">💬 Testimonials</div>
          <h2 className="section-title">
            Loved by <span className="gradient-text">50,000+</span> learners
          </h2>
          <p className="section-subtitle">
            Real stories from students and instructors who changed their lives with LearnFlow.
          </p>
        </div>

        <div className="test__carousel">
          <div className="test__track-wrapper">
            <div ref={trackRef} className="test__track">
              {testimonials.map((t, i) => (
                <div key={t.name} className="test__card glass-card">
                  <div className="test__rating">
                    {'★'.repeat(t.rating)}
                  </div>
                  <p className="test__quote">"{t.text}"</p>
                  <div className="test__author">
                    <div className="test__avatar" style={{ background: `${t.color}22`, color: t.color }}>
                      {t.avatar}
                    </div>
                    <div>
                      <div className="test__name">{t.name}</div>
                      <div className="test__role">{t.role} · {t.company}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="test__controls">
            <button className="test__arrow btn btn-ghost" onClick={() => slideTo(current - 1)} aria-label="Previous">←</button>
            <div className="test__dots">
              {testimonials.slice(0, maxIndex + 1).map((_, i) => (
                <button key={i} className={`test__dot ${i === current ? 'test__dot--active' : ''}`} onClick={() => slideTo(i)} />
              ))}
            </div>
            <button className="test__arrow btn btn-ghost" onClick={() => slideTo(current + 1)} aria-label="Next">→</button>
          </div>
        </div>
      </div>
    </section>
  )
}
