import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GlowCard } from '@/components/ui/spotlight-card'

const COURSES = [
  { title: 'JavaScript Crash Course', desc: 'Learn JS fundamentals — variables, functions, DOM & more.', price: 499, original: 1999, badge: 'BESTSELLER', badgeColor: '#f59e0b', glow: 'blue', img: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&auto=format&fit=crop' },
  { title: 'Python Masterclass', desc: 'Complete Python tutorial from scratch — perfect for absolute beginners.', price: 599, original: 2499, badge: 'POPULAR', badgeColor: '#8b5cf6', glow: 'purple', img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop' },
  { title: 'Node.js Enterprise APIs', desc: 'Build scalable backend apps with Node.js — Express, REST APIs & microservices.', price: 699, original: 2999, badge: 'NEW', badgeColor: '#10b981', glow: 'green', img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop' },
  { title: 'React Ecosystem Guide', desc: 'Master React from zero — Server Components, hooks, state management & routing.', price: 799, original: 3499, badge: 'TRENDING', badgeColor: '#06b6d4', glow: 'blue', img: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop' },
  { title: 'CSS Complete Guide', desc: 'Advanced layouts — Flexbox, Grid, animations, Tailwind & responsive design.', price: 349, original: 1499, badge: 'HOT', badgeColor: '#ef4444', glow: 'red', img: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600&auto=format&fit=crop' },
  { title: 'TypeScript for Beginners', desc: 'Add type safety to your JavaScript — interfaces, generics & real-world projects.', price: 449, original: 1999, badge: 'BESTSELLER', badgeColor: '#f59e0b', glow: 'orange', img: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&auto=format&fit=crop' },
  { title: 'Git & GitHub Crash Course', desc: 'Version control essentials — commits, branches, merges & collaboration.', price: 0, original: 999, badge: 'FREE', badgeColor: '#10b981', glow: 'green', img: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&auto=format&fit=crop' },
  { title: 'Django Course 2023', desc: 'The complete Python Django masterclass — models, views, templates & deployment.', price: 599, original: 2499, badge: 'POPULAR', badgeColor: '#8b5cf6', glow: 'purple', img: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&auto=format&fit=crop' },
]

// Full layout structure — implement exactly this:
export default function Dashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login', { replace: true })
  }

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Developer'
  const initials = displayName.substring(0, 2).toUpperCase()

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#080810' }}>
      
      {/* SIDEBAR — fixed, never overlaps */}
      <aside style={{ width: '200px', minWidth: '200px', flexShrink: 0, backgroundColor: '#0d0d1a', borderRight: '1px solid #1a1a2e', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ fontSize: '20px', fontWeight: 800, color: 'white', marginBottom: '32px', paddingLeft: '8px', zIndex: 10 }}>SkillOrbit</div>
        {['Dashboard', 'My Courses', 'Certificates'].map((item, idx) => (
          <a key={item} href="#" style={{ color: idx === 0 ? 'white' : '#aaa', background: idx === 0 ? 'rgba(255,255,255,0.05)' : 'transparent', padding: '10px 12px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px' }}>{item}</a>
        ))}
        <button onClick={handleSignOut} style={{ marginTop: 'auto', background: 'transparent', border: 'none', color: '#555', fontSize: '12px', paddingLeft: '8px', textAlign: 'left', cursor: 'pointer' }}>Sign Out</button>
      </aside>

      {/* MAIN — takes all remaining space */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '32px', minWidth: 0, fontFamily: 'DM Sans, sans-serif' }}>
        
        {/* TOP NAR */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
          <input placeholder="Search courses..." style={{ flex: 1, maxWidth: '360px', background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '10px', padding: '10px 16px', color: 'white', fontSize: '14px' }} />
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ color: 'white', fontWeight: 600 }}>{displayName}</span>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '14px' }}>{initials}</div>
          </div>
        </div>

        {/* HERO */}
        <div style={{ position: 'relative', background: 'linear-gradient(135deg, #0f0f23 0%, #1a0a2e 50%, #0a1628 100%)', border: '1px solid #2a2a4a', borderRadius: '20px', padding: '48px 40px', marginBottom: '32px', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ fontSize: '11px', letterSpacing: '3px', color: '#6366f1', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 600 }}>WELCOME TO ORBIT</div>
          <h1 style={{ fontSize: '48px', fontWeight: 900, color: 'white', lineHeight: 1.1, margin: 0, fontFamily: 'Space Grotesk, sans-serif' }}>
            Ready to expand your<br/>
            <span style={{ background: 'linear-gradient(90deg, #818cf8, #a78bfa, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>developer universe?</span>
          </h1>
          <p style={{ color: '#888', marginTop: '16px', maxWidth: '480px', fontSize: '15px', lineHeight: 1.6 }}>Explore premium, high-octane courses engineered to elevate your engineering skills to the next dimension.</p>
          
          {/* MISSION CARD — positioned inside hero, top right */}
          <div style={{ position: 'absolute', top: '24px', right: '24px', background: 'rgba(13,13,26,0.9)', border: '1px solid #2a2a4a', borderRadius: '14px', padding: '16px 20px', minWidth: '240px', backdropFilter: 'blur(10px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ color: '#888', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>Current Mission</span>
              <span style={{ color: '#6366f1', fontSize: '13px', fontWeight: 700 }}>68%</span>
            </div>
            <div style={{ color: 'white', fontWeight: 700, fontSize: '15px', marginBottom: '4px' }}>Advanced React Patterns</div>
            <div style={{ color: '#888', fontSize: '12px', marginBottom: '12px' }}>Module 4: Server Components</div>
            <div style={{ background: '#1a1a2e', borderRadius: '4px', height: '4px', marginBottom: '12px' }}>
              <div style={{ background: 'linear-gradient(90deg, #6366f1, #818cf8)', width: '68%', height: '100%', borderRadius: '4px' }} />
            </div>
            <button style={{ width: '100%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: 'none', borderRadius: '8px', color: 'white', padding: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}>Resume Mission →</button>
          </div>
        </div>

        {/* FILTER PILLS */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {['All', 'Frontend', 'Backend', 'DevOps', 'Free'].map((f, i) => (
            <button key={f} style={{ padding: '8px 20px', borderRadius: '999px', border: i === 0 ? '1px solid #6366f1' : '1px solid #2a2a4a', background: i === 0 ? 'rgba(99,102,241,0.15)' : 'transparent', color: i === 0 ? '#818cf8' : '#888', fontSize: '13px', cursor: 'pointer', fontWeight: 500 }}>{f}</button>
          ))}
        </div>

        {/* SECTION TITLE */}
        <h2 style={{ color: 'white', fontSize: '20px', fontWeight: 700, marginBottom: '20px', fontFamily: 'Syne, sans-serif' }}>Explore Arsenal</h2>

        {/* COURSE GRID — 4 columns using GlowCard */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {COURSES.map((course, i) => (
            <div key={i} style={{ width: '100%' }}>
              <GlowCard glowColor={course.glow} customSize={true} className="w-full" style={{ height: '100%', backgroundColor: '#0c0c14', border: '1px solid #2a2a4a', padding: '0', display: 'flex', flexDirection: 'column' }}>
                {/* image */}
                <div style={{ borderRadius: '10px 10px 0 0', overflow: 'hidden', height: '160px', position: 'relative' }}>
                  <img src={course.img} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{ position: 'absolute', top: '12px', left: '12px', background: course.badgeColor, color: '#fff', fontSize: '10px', fontWeight: 800, padding: '4px 8px', borderRadius: '6px', letterSpacing: '0.5px' }}>{course.badge}</span>
                </div>
                {/* info */}
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', gap: '12px', color: '#888', fontSize: '11px', marginBottom: '8px', fontWeight: 'bold' }}>
                    <span>12h 30m</span><span>•</span><span>4.8k+</span>
                  </div>
                  <div style={{ color: 'white', fontWeight: 700, fontSize: '16px', marginBottom: '8px', fontFamily: 'Syne, sans-serif' }}>{course.title}</div>
                  <div style={{ color: '#888', fontSize: '13px', lineHeight: 1.5, marginBottom: '16px', flex: 1 }}>{course.desc}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #1a1a2e' }}>
                    <span style={{ color: 'white', fontWeight: 800, fontSize: '18px', fontFamily: 'Space Grotesk, sans-serif' }}>
                      {course.price === 0 ? 'Free' : `₹${course.price}`} 
                      {course.original && <span style={{ color: '#555', fontWeight: 400, fontSize: '12px', textDecoration: 'line-through', marginLeft: '6px' }}>₹{course.original}</span>}
                    </span>
                    <button style={{ background: 'transparent', border: 'none', color: '#818cf8', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>Enroll →</button>
                  </div>
                </div>
              </GlowCard>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
