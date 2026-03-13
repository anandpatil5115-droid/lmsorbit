import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Dashboard.css'

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login', { replace: true })
  }

  const displayName =
    user?.user_metadata?.full_name ||
    user?.email?.split('@')[0] ||
    'Learner'

  const stats = [
    { icon: '📚', value: '3', label: 'Enrolled Courses' },
    { icon: '🎯', value: '12', label: 'Lessons Done' },
    { icon: '🔥', value: '5', label: 'Day Streak' },
    { icon: '🏆', value: '2', label: 'Certificates' },
  ]

  const courses = [
    {
      title: 'React & Next.js Mastery',
      desc: 'Build production-ready apps with React 19 and Next.js 15.',
      progress: 65,
      gradient: 'course-gradient-1',
      icon: '⚛️',
    },
    {
      title: 'Python for Data Science',
      desc: 'From fundamentals to machine learning with pandas & scikit-learn.',
      progress: 30,
      gradient: 'course-gradient-2',
      icon: '🐍',
    },
    {
      title: 'UI/UX Design Bootcamp',
      desc: 'Design stunning interfaces with Figma and modern best practices.',
      progress: 10,
      gradient: 'course-gradient-3',
      icon: '🎨',
    },
  ]

  return (
    <div className="dashboard">
      {/* Background */}
      <div className="dashboard-bg">
        <div className="auth-orb auth-orb-1" />
        <div className="auth-orb auth-orb-2" />
      </div>

      {/* Top bar */}
      <header className="dashboard-topbar">
        <div className="dashboard-brand">
          <div className="dashboard-brand-icon">🚀</div>
          <span className="dashboard-brand-name">SkillOrbit</span>
        </div>
        <div className="dashboard-user">
          <span className="dashboard-user-email">{user?.email}</span>
          <button className="dashboard-signout" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="dashboard-content">
        {/* Welcome */}
        <div className="dashboard-welcome">
          <h2>
            Welcome back, <span className="gradient-text">{displayName}</span> 👋
          </h2>
          <p>
            Pick up where you left off or explore new courses to accelerate your
            skills.
          </p>
        </div>

        {/* Stats */}
        <div className="dashboard-stats">
          {stats.map((stat) => (
            <div className="dashboard-stat" key={stat.label}>
              <div className="dashboard-stat-icon">{stat.icon}</div>
              <div className="dashboard-stat-value">{stat.value}</div>
              <div className="dashboard-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Courses */}
        <h3 className="dashboard-section-title">Your Courses</h3>
        <div className="dashboard-courses">
          {courses.map((course) => (
            <div className="dashboard-course" key={course.title}>
              <div className="dashboard-course-banner">
                <div
                  className={`dashboard-course-banner-gradient ${course.gradient}`}
                />
                <div className="dashboard-course-banner-icon">
                  {course.icon}
                </div>
              </div>
              <div className="dashboard-course-body">
                <h3>{course.title}</h3>
                <p>{course.desc}</p>
                <div className="dashboard-course-progress">
                  <div className="dashboard-course-progress-bar">
                    <div
                      className="dashboard-course-progress-fill"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <span className="dashboard-course-progress-text">
                    {course.progress}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
