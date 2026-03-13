import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Demo.css'

gsap.registerPlugin(ScrollTrigger)

const coursesList = [
  { name: 'Advanced React Patterns', cat: 'Development', students: 2400, prog: 75, color: '#7c5cfc' },
  { name: 'UI/UX Masterclass', cat: 'Design', students: 1800, prog: 60, color: '#c471ed' },
  { name: 'Data Science Bootcamp', cat: 'Analytics', students: 3100, prog: 88, color: '#22d9a7' },
  { name: 'Business Strategy 101', cat: 'Business', students: 950, prog: 42, color: '#ff8c42' },
]

const stats = [
  { label: 'Revenue', value: '$48,240', change: '+18%', up: true },
  { label: 'Active Users', value: '12,841', change: '+6%', up: true },
  { label: 'Avg. Score', value: '87.4%', change: '+2.1%', up: true },
  { label: 'Churn Rate', value: '2.3%', change: '-0.4%', up: false },
]

export default function Demo() {
  const sectionRef = useRef(null)
  const [activeBar, setActiveBar] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.demo__head', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: '.demo__head', start: 'top 80%' },
      })

      gsap.fromTo('.demo__window', { opacity: 0, y: 60, scale: 0.97 }, {
        opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.demo__window', start: 'top 80%' },
      })

      gsap.fromTo('.stat-tile', { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.5, stagger: 0.1,
        scrollTrigger: { trigger: '.demo__stats', start: 'top 85%' },
      })

      // Animate progress bars when in view
      ScrollTrigger.create({
        trigger: '.demo__courses',
        start: 'top 80%',
        onEnter: () => {
          document.querySelectorAll('.demo-prog-fill').forEach(el => {
            el.style.width = el.getAttribute('data-w')
          })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="demo" ref={sectionRef} className="section demo">
      <div className="container">
        <div className="demo__head" style={{ opacity: 0 }}>
          <div className="section-label">🖥️ Live Dashboard Preview</div>
          <h2 className="section-title">
            See LearnFlow<br />
            <span className="gradient-text">in action</span>
          </h2>
          <p className="section-subtitle">
            A powerful dashboard that gives instructors and admins everything at a glance.
          </p>
        </div>

        <div className="demo__window glass-card" style={{ opacity: 0 }}>
          {/* Titlebar */}
          <div className="demo__bar">
            <div className="demo__dots">
              <span className="demo__dot" style={{background:'#ff5f57'}}/>
              <span className="demo__dot" style={{background:'#ffbd2e'}}/>
              <span className="demo__dot" style={{background:'#28ca42'}}/>
            </div>
            <span className="demo__url">app.learnflow.io/dashboard</span>
          </div>

          {/* Sidebar + Main */}
          <div className="demo__body">
            <aside className="demo__sidebar">
              {['🏠 Overview', '📚 Courses', '👥 Students', '📊 Analytics', '💬 Messages', '⚙️ Settings'].map(item => (
                <div key={item} className={`demo__sidebar-item ${item.includes('Analytics') ? 'demo__sidebar-item--active' : ''}`}>
                  {item}
                </div>
              ))}
            </aside>

            <main className="demo__main">
              {/* Stat tiles */}
              <div className="demo__stats">
                {stats.map(s => (
                  <div key={s.label} className="stat-tile glass-card" style={{ opacity: 0 }}>
                    <div className="stat-tile__label">{s.label}</div>
                    <div className="stat-tile__value">{s.value}</div>
                    <div className={`stat-tile__change ${s.up ? 'stat-tile__change--up' : 'stat-tile__change--down'}`}>
                      {s.up ? '↑' : '↓'} {s.change}
                    </div>
                  </div>
                ))}
              </div>

              {/* Courses list */}
              <div className="demo__courses">
                <div className="demo__courses-header">
                  <span>Top Courses</span>
                  <span style={{ color: 'var(--accent)', fontSize: '0.78rem', cursor: 'pointer' }}>View All</span>
                </div>
                {coursesList.map(c => (
                  <div key={c.name} className="demo__course-row">
                    <div className="demo__course-avatar" style={{ background: `${c.color}22`, color: c.color }}>
                      {c.name[0]}
                    </div>
                    <div className="demo__course-info">
                      <div className="demo__course-name">{c.name}</div>
                      <div className="demo__course-meta">{c.cat} · {c.students.toLocaleString()} students</div>
                    </div>
                    <div className="demo__course-prog">
                      <div style={{ fontSize: '0.75rem', textAlign: 'right', marginBottom: '4px', color: c.color }}>{c.prog}%</div>
                      <div className="demo-prog-bar">
                        <div
                          className="demo-prog-fill"
                          data-w={`${c.prog}%`}
                          style={{ background: c.color, width: '0%', transition: 'width 1s ease' }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    </section>
  )
}
