import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Demo', href: '#demo' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav ref={navRef} className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-icon">🚀</span>
          <span className="navbar__logo-text">LearnFlow</span>
        </Link>

        <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          {navLinks.map(lnk => (
            <li key={lnk.label}>
              <a href={lnk.href} className="navbar__link" onClick={() => setMenuOpen(false)}>
                {lnk.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <Link to="/login" className="btn btn-ghost navbar__signin">Sign In</Link>
          <Link to="/signup" className="btn btn-primary">
            <span>Get Started</span>
          </Link>
        </div>

        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
