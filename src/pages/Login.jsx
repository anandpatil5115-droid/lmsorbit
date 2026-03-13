import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, user } = useAuth()
  const navigate = useNavigate()

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true })
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await signIn(email, password)
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      navigate('/dashboard', { replace: true })
    }
  }

  return (
    <div className="auth-page">
      {/* Background effects */}
      <div className="auth-orb auth-orb-1" />
      <div className="auth-orb auth-orb-2" />
      <div className="auth-orb auth-orb-3" />
      <div className="auth-grid" />

      <div className="auth-card">
        {/* Logo */}
        <div className="auth-header">
          <div className="auth-logo">
            <div className="auth-logo-icon">🚀</div>
            <span className="auth-logo-text">SkillOrbit</span>
          </div>
          <h1 className="auth-title">Welcome Back to SkillOrbit</h1>
          <p className="auth-subtitle">
            Sign in to continue your learning journey
          </p>
        </div>

        {/* Error */}
        {error && <div className="auth-error">{error}</div>}

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label className="auth-label" htmlFor="login-email">Email address</label>
            <input
              id="login-email"
              className="auth-input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="login-password">Password</label>
            <input
              id="login-password"
              className="auth-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <div className="auth-forgot">
            <a href="#">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            <span>{loading ? 'Signing in...' : 'Log In'}</span>
          </button>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <Link to="/signup">
            <button type="button" className="auth-secondary-btn">
              Create Account
            </button>
          </Link>
        </form>

        <div className="auth-footer">
          Don't have an account?{' '}
          <Link to="/signup">Sign up for free</Link>
        </div>
      </div>
    </div>
  )
}
