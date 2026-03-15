import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Pricing.css'

gsap.registerPlugin(ScrollTrigger)

const plans = [
  {
    name: 'Starter',
    price: '$29',
    period: '/month',
    desc: 'Perfect for solo developers and small teams getting started.',
    color: '#00F0FF',
    features: [
      '5 AI Agents',
      'Up to 10k requests/mo',
      'Basic analytics',
      'Email support',
      'Community access',
    ],
    cta: 'Get Started',
    recommended: false,
  },
  {
    name: 'Pro',
    price: '$99',
    period: '/month',
    desc: 'The best choice for growing SaaS startups and professional automators.',
    color: '#7C3AED',
    features: [
      'Unlimited AI Agents',
      'Up to 1M requests/mo',
      'Advanced analytics',
      'Live chat support',
      'White-label branding',
      'Custom LLM models',
      'API access',
    ],
    cta: 'Start Pro Trial',
    recommended: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'Built for corporates, universities, and large enterprise infrastructure.',
    color: '#00F0FF',
    features: [
      'Everything in Pro',
      'SSO / SAML auth',
      'Dedicated support',
      'SLA 99.9% guarantee',
      'On-premise option',
      'Custom integrations',
      'Priority roadmap',
    ],
    cta: 'Contact Sales',
    recommended: false,
  },
]

export default function Pricing() {
  const sectionRef = useRef(null)
  const [annual, setAnnual] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.pricing__head', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: '.pricing__head', start: 'top 80%' },
      })
      gsap.fromTo('.pricing-card', { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.pricing__grid', start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="pricing" ref={sectionRef} className="section pricing">
      <div className="container">
        <div className="pricing__head" style={{ opacity: 0 }}>
          <div className="section-label">💳 Pricing</div>
          <h2 className="section-title">
            Simple, transparent<br />
            <span className="gradient-text">pricing for all</span>
          </h2>
          <p className="section-subtitle">
            No hidden fees. Cancel anytime. All plans include a 14-day free trial.
          </p>

          <div className="pricing__toggle">
            <span className={!annual ? 'toggle-active' : ''}>Monthly</span>
            <button
              className={`toggle-switch ${annual ? 'toggle-switch--on' : ''}`}
              onClick={() => setAnnual(a => !a)}
            >
              <span className="toggle-thumb" />
            </button>
            <span className={annual ? 'toggle-active' : ''}>Annual <em className="save-badge">Save 20%</em></span>
          </div>
        </div>

        <div className="pricing__grid">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card glass-card ${plan.recommended ? 'pricing-card--featured' : ''}`}
              style={{ '--accent-color': plan.color }}
            >
              {plan.recommended && (
                <div className="pricing-badge">⭐ Most Popular</div>
              )}
              <div className="pricing-card__header">
                <h3 className="pricing-card__name">{plan.name}</h3>
                <p className="pricing-card__desc">{plan.desc}</p>
              </div>
              <div className="pricing-card__price">
                <span className="price-amount">{annual && plan.price !== 'Custom' ? `$${parseInt(plan.price.slice(1)) * 0.8 | 0}` : plan.price}</span>
                <span className="price-period">{plan.period}</span>
              </div>
              <ul className="pricing-card__features">
                {plan.features.map(f => (
                  <li key={f}>
                    <span className="feature-check">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#" className={`btn pricing-card__cta ${plan.recommended ? 'btn-primary' : 'btn-ghost'}`}>
                {plan.recommended ? <span>{plan.cta}</span> : plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
