import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Features.css'

gsap.registerPlugin(ScrollTrigger)

const photos = [
  { id: 1, src: '/photo1.jpg' },
  { id: 2, src: '/photo2.jpg' },
  { id: 3, src: '/photo3.jpg' }
]

export default function Features() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.features__heading', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: '.features__heading', start: 'top 80%' },
      })

      gsap.fromTo('.photo-card', { opacity: 0, scale: 0.8, y: 50 }, {
        opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: '.features__grid', start: 'top 80%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="features" ref={sectionRef} className="section features">
      <div className="container">
        <div className="features__heading">
          <div className="section-label">✨ Just For Fun</div>
          <h2 className="section-title">
            Some Cool<br />
            <span className="gradient-text">Photos</span>
          </h2>
          <p className="section-subtitle">
            Because sometimes you just need to drop some cool pictures in instead of boring features.
          </p>
        </div>

        <div className="features__grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', justifyContent: 'center' }}>
          {photos.map((photo) => (
            <div key={photo.id} className="photo-card glass-card" style={{ padding: '1rem', borderRadius: '24px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
               <img 
                 src={photo.src} 
                 alt={`Fun photo ${photo.id}`} 
                 style={{ width: '100%', height: 'auto', borderRadius: '16px', objectFit: 'cover', aspectRatio: '3/4' }} 
               />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
