import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SpotlightCard from './SpotlightCard'
import './Courses.css'

gsap.registerPlugin(ScrollTrigger)

const courses = [
  {
    title: 'Machine Learning Fundamentals',
    desc: 'Master the core algorithms powering modern AI — from linear regression to deep neural networks with hands-on projects.',
    category: 'AI & ML',
    level: 'Intermediate',
    lessons: 42,
    duration: '24h',
    glowColor: 'purple',
    catColor: '#c471ed',
  },
  {
    title: 'Full-Stack Web Development',
    desc: 'Build production-ready applications from scratch using React, Node.js, and modern deployment pipelines.',
    category: 'Development',
    level: 'Beginner',
    lessons: 68,
    duration: '40h',
    glowColor: 'blue',
    catColor: '#00F0FF',
  },
  {
    title: 'Data Science & Analytics',
    desc: 'Transform raw data into actionable insights with Python, Pandas, and interactive visualization techniques.',
    category: 'Data',
    level: 'Intermediate',
    lessons: 36,
    duration: '20h',
    glowColor: 'green',
    catColor: '#22d9a7',
  },
  {
    title: 'Cloud Architecture on AWS',
    desc: 'Design scalable, fault-tolerant systems on AWS — covering EC2, Lambda, S3, and infrastructure as code.',
    category: 'Cloud',
    level: 'Advanced',
    lessons: 30,
    duration: '18h',
    glowColor: 'orange',
    catColor: '#ff8c42',
  },
  {
    title: 'UI/UX Design Mastery',
    desc: 'Create stunning user experiences with Figma, design systems, micro-interactions, and usability testing.',
    category: 'Design',
    level: 'Beginner',
    lessons: 52,
    duration: '28h',
    glowColor: 'purple',
    catColor: '#c471ed',
  },
  {
    title: 'Cybersecurity Essentials',
    desc: 'Protect modern applications with ethical hacking, penetration testing, and zero-trust security architecture.',
    category: 'Security',
    level: 'Intermediate',
    lessons: 38,
    duration: '22h',
    glowColor: 'red',
    catColor: '#ff4d6a',
  },
]

export default function Courses() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.courses__heading', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: '.courses__heading', start: 'top 80%' },
      })

      gsap.fromTo('.course-card', { opacity: 0, y: 60 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.courses__grid', start: 'top 85%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="courses" ref={sectionRef} className="section courses">
      <div className="container">
        <div className="courses__heading">
          <div className="section-label">🎓 Popular Courses</div>
          <h2 className="section-title">
            Explore our<br />
            <span className="gradient-text">top courses</span>
          </h2>
          <p className="section-subtitle">
            Industry-aligned curriculum designed by experts. Learn at your own pace with hands-on projects and mentorship.
          </p>
        </div>

        <div className="courses__grid">
          {courses.map((course) => (
            <SpotlightCard
              key={course.title}
              glowColor={course.glowColor}
              className="course-card"
            >
              <span
                className="course-card__category"
                style={{
                  '--cat-bg': `color-mix(in srgb, ${course.catColor} 12%, transparent)`,
                  '--cat-color': course.catColor,
                  '--cat-border': `color-mix(in srgb, ${course.catColor} 25%, transparent)`,
                }}
              >
                {course.category}
              </span>

              <div
                className="course-card__level"
                style={{ '--level-color': course.catColor }}
              >
                <span className="course-card__level-dot" />
                {course.level}
              </div>

              <h3 className="course-card__title">{course.title}</h3>
              <p className="course-card__desc">{course.desc}</p>

              <div className="course-card__stats">
                <span className="course-card__stat">
                  <span className="course-card__stat-icon">📚</span>
                  {course.lessons} lessons
                </span>
                <span className="course-card__stat">
                  <span className="course-card__stat-icon">⏱</span>
                  {course.duration}
                </span>
              </div>

              <div className="course-card__divider" />

              <a
                href="#"
                className="course-card__cta"
                style={{ '--cta-glow': `color-mix(in srgb, ${course.catColor} 35%, transparent)` }}
              >
                Enroll Now
                <span className="course-card__cta-arrow">→</span>
              </a>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}
