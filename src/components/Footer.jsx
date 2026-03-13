import './Footer.css'

const footerLinks = {
  Product: ['Features', 'Pricing', 'Changelog', 'Roadmap', 'Status'],
  Company: ['About Us', 'Blog', 'Careers', 'Press', 'Contact'],
  Resources: ['Documentation', 'Tutorials', 'Community', 'Webinars', 'Partners'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'],
}

const socials = [
  { label: 'Twitter', icon: '𝕏', href: '#' },
  { label: 'LinkedIn', icon: 'in', href: '#' },
  { label: 'GitHub', icon: '⌥', href: '#' },
  { label: 'YouTube', icon: '▶', href: '#' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-icon">⚡</span>
              <span className="footer__logo-text">LearnFlow</span>
            </div>
            <p className="footer__tagline">
              The most powerful LMS platform for modern educators and learners. Build, teach, and scale.
            </p>
            <div className="footer__socials">
              {socials.map(s => (
                <a key={s.label} href={s.href} className="footer__social" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group} className="footer__col">
              <h4 className="footer__col-title">{group}</h4>
              <ul className="footer__col-links">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="footer__link">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer__bottom">
          <div className="footer__bottom-left">
            <span>© 2026 LearnFlow Technologies, Inc. All rights reserved.</span>
          </div>
          <div className="footer__bottom-right">
            <a href="mailto:hello@learnflow.io" className="footer__email">hello@learnflow.io</a>
            <span className="footer__divider">·</span>
            <span>🌍 Global · English</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
