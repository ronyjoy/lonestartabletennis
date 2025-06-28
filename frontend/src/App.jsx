import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Logo from './components/Logo'
import PublicLeagueSignup from './components/PublicLeagueSignup'
import { API_ENDPOINTS } from './config/api'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/matches" element={<MatchesPage />} />
        <Route path="/leagues" element={<LeaguesPage />} />
        <Route path="/leagues/signup" element={<LeagueSignupPage />} />
        <Route path="/league-signup" element={<PublicLeagueSignup />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  )
}

function HomePage() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsLoggedIn(true)
    }
  }, [])

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Logo size="small" showText={true} />
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={() => navigate('/login')}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Login
              </button>
              <button 
                onClick={() => navigate('/about')}
                className="text-gray-600 hover:text-gray-800 font-medium"
              >
                About
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Austin's Premier <span className="text-blue-600">Table Tennis</span> Academy
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join our community of passionate players! From beginner lessons to competitive leagues, 
            we offer everything you need to elevate your ping pong game.
          </p>
          
          {/* Primary CTA */}
          <div className="mb-12">
            <button 
              onClick={() => navigate('/league-signup')}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl shadow-lg transform hover:scale-105 transition-all duration-200 mr-4"
            >
              🏓 Join This Week's Leagues
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              👤 Member Login
            </button>
          </div>
          
          <p className="text-sm text-gray-500">
            New to table tennis? No problem! • All skill levels welcome • Drop-in friendly
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-lg text-gray-600">Everything you need for your table tennis journey</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-4xl mb-4">🏓</div>
              <h3 className="text-xl font-bold mb-2">Weekly Leagues</h3>
              <p className="text-gray-600">Competitive and social leagues for all skill levels. Sign up weekly, no long-term commitment required.</p>
            </div>
            
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold mb-2">Professional Coaching</h3>
              <p className="text-gray-600">Learn from certified coaches who track your progress and help you improve specific skills.</p>
            </div>
            
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-2">Skill Tracking</h3>
              <p className="text-gray-600">Monitor your improvement with our comprehensive skill rating system and performance analytics.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Login Options Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Community</h2>
            <p className="text-lg text-gray-600">Choose your role and get started today</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="text-5xl mb-4">👨‍🎓</div>
              <h3 className="text-2xl font-bold mb-4 text-blue-600">Student</h3>
              <p className="text-gray-600 mb-6">Join leagues, track your skills, and improve your game with professional coaching.</p>
              <button 
                onClick={() => navigate('/login?role=student')}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg"
              >
                Student Login
              </button>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="text-5xl mb-4">👨‍🏫</div>
              <h3 className="text-2xl font-bold mb-4 text-green-600">Coach</h3>
              <p className="text-gray-600 mb-6">Manage student progress, assign skill ratings, and help players reach their potential.</p>
              <button 
                onClick={() => navigate('/login?role=coach')}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg"
              >
                Coach Login
              </button>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="text-5xl mb-4">👨‍💼</div>
              <h3 className="text-2xl font-bold mb-4 text-purple-600">Admin</h3>
              <p className="text-gray-600 mb-6">Manage leagues, oversee operations, and maintain the academy's systems.</p>
              <button 
                onClick={() => navigate('/login?role=admin')}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg"
              >
                Admin Login
              </button>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600">
              New student? <button onClick={() => navigate('/login')} className="text-blue-600 hover:text-blue-800 font-medium">Register here</button>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Logo size="small" showText={true} className="mb-4" />
          <p className="text-gray-400">© 2024 Lone Star Table Tennis Academy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [role, setRole] = useState('student')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [expectedRole, setExpectedRole] = useState(null)

  useEffect(() => {
    // Check if role was specified in URL parameters
    const urlParams = new URLSearchParams(window.location.search)
    const roleParam = urlParams.get('role')
    if (roleParam) {
      setExpectedRole(roleParam)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setLoading(true)

    try {
      const url = isLogin 
        ? API_ENDPOINTS.LOGIN
        : API_ENDPOINTS.REGISTER
      
      const body = isLogin 
        ? { email, password }
        : { email, password, firstName, lastName, role }

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      const data = await response.json()

      if (response.ok) {
        // Check if user role matches expected role
        if (expectedRole && data.user.role !== expectedRole) {
          setMessage(`This login is for ${expectedRole}s only. Your account is registered as ${data.user.role}.`)
          return
        }
        
        setMessage(`${isLogin ? 'Login' : 'Registration'} successful! Welcome ${data.user.firstName}!`)
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        
        // Navigate to dashboard after successful login
        setTimeout(() => {
          navigate('/dashboard')
        }, 1000)
      } else {
        setMessage(data.error?.message || 'Something went wrong')
      }
    } catch (error) {
      setMessage('Error connecting to server. Make sure backend is running on port 3001.')
    } finally {
      setLoading(false)
    }
  }

  const getRoleColor = (role) => {
    switch(role) {
      case 'student': return 'text-blue-600'
      case 'coach': return 'text-green-600'
      case 'admin': return 'text-purple-600'
      default: return 'text-gray-600'
    }
  }

  const getRoleIcon = (role) => {
    switch(role) {
      case 'student': return '👨‍🎓'
      case 'coach': return '👨‍🏫'
      case 'admin': return '👨‍💼'
      default: return '👤'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-xl">
        <div className="text-center">
          <Logo size="medium" showText={false} className="mb-4" />
          {expectedRole ? (
            <div className="mb-6">
              <div className="text-6xl mb-2">{getRoleIcon(expectedRole)}</div>
              <h2 className={`text-3xl font-bold ${getRoleColor(expectedRole)}`}>
                {expectedRole.charAt(0).toUpperCase() + expectedRole.slice(1)} {isLogin ? 'Login' : 'Registration'}
              </h2>
              <p className="mt-2 text-gray-600">
                {isLogin ? `Sign in to your ${expectedRole} account` : `Create your ${expectedRole} account`}
              </p>
            </div>
          ) : (
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900">
                {isLogin ? 'Sign In' : 'Register'}
              </h2>
              <p className="mt-2 text-gray-600">
                {isLogin ? 'Access your Table Tennis Academy account' : 'Create your Table Tennis Academy account'}
              </p>
            </div>
          )}
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <input
                  type="text"
                  value="Student"
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Only students can register. Coaches and admins are added by the system administrator.
                </p>
              </div>
            </>
          )}
          <div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </div>
        </form>
        
        {message && (
          <div className={`text-center p-3 rounded ${message.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        <div className="text-center space-y-2">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:text-blue-700"
          >
            {isLogin ? 'Need an account? Register' : 'Already have an account? Sign In'}
          </button>
          <br />
          <button 
            onClick={() => navigate('/')}
            className="text-gray-500 hover:text-gray-700"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}

function AboutPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Table Tennis Academy</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Welcome to Lone Star Table Tennis Academy! Students can register to join our academy. 
            Coaches and administrators are added by the system administrator.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">🏆 Skill Tracking</h3>
            <p className="text-gray-600">Track your progress across different table tennis skills and techniques.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">🏓 League Management</h3>
            <p className="text-gray-600">Join leagues, compete with other players, and climb the rankings.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">📊 Match Analytics</h3>
            <p className="text-gray-600">Analyze your match performance and identify areas for improvement.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">👥 Community</h3>
            <p className="text-gray-600">Connect with other players and share your table tennis journey.</p>
          </div>
        </div>
        <div className="text-center mt-12">
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}

function DashboardPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (!token) {
      navigate('/login')
      return
    }
    
    if (userData) {
      setUser(JSON.parse(userData))
      fetchDashboardStats()
    }
  }, [navigate])

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('token')
      
      const response = await fetch(API_ENDPOINTS.DASHBOARD_STATS, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Logo size="small" showText={false} />
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user.firstName}!</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h2>
            
            {/* Role-specific Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {user.role === 'admin' && (
                <>
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="text-2xl">👨‍🎓</div>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Total Students
                            </dt>
                            <dd className="text-lg font-medium text-gray-900">
                              {loading ? '...' : stats.totalStudents || 0}
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="text-2xl">👨‍🏫</div>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Total Coaches
                            </dt>
                            <dd className="text-lg font-medium text-gray-900">
                              {loading ? '...' : stats.totalCoaches || 0}
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="text-2xl">🏆</div>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Active Leagues
                            </dt>
                            <dd className="text-lg font-medium text-gray-900">
                              {loading ? '...' : stats.activeLeagues || 0}
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="text-2xl">📊</div>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Total Registrations
                            </dt>
                            <dd className="text-lg font-medium text-gray-900">
                              {loading ? '...' : stats.totalRegistrations || 0}
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="text-2xl">📈</div>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              This Week's Signups
                            </dt>
                            <dd className="text-lg font-medium text-gray-900">
                              {loading ? '...' : stats.weeklyRegistrations || 0}
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {user.role === 'coach' && (
                <>
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="text-2xl">👨‍🎓</div>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Students Coached
                            </dt>
                            <dd className="text-lg font-medium text-gray-900">
                              {loading ? '...' : stats.studentsCoached || 0}
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="text-2xl">📚</div>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Skills Assigned
                            </dt>
                            <dd className="text-lg font-medium text-gray-900">
                              {loading ? '...' : stats.skillsAssigned || 0}
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="text-2xl">⭐</div>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Avg Skill Rating
                            </dt>
                            <dd className="text-lg font-medium text-gray-900">
                              {loading ? '...' : stats.averageSkillRating || '0.0'}
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {user.role === 'student' && (
                <>
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="text-2xl">🏆</div>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Skills Tracked
                            </dt>
                            <dd className="text-lg font-medium text-gray-900">
                              {loading ? '...' : stats.skillsTracked || 0}
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="text-2xl">⭐</div>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Average Rating
                            </dt>
                            <dd className="text-lg font-medium text-gray-900">
                              {loading ? '...' : stats.averageRating || '0.0'}
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="text-2xl">🏓</div>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              League Registrations
                            </dt>
                            <dd className="text-lg font-medium text-gray-900">
                              {loading ? '...' : stats.leagueRegistrations || 0}
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Role-based Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Skills - Students view only, Coaches can manage */}
              <button 
                onClick={() => navigate('/skills')}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-lg"
              >
                📊 {user.role === 'coach' ? 'Manage Skills' : 'View Skills'}
              </button>
              
              {/* Matches - Admin only */}
              {user.role === 'admin' && (
                <button 
                  onClick={() => navigate('/matches')}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-4 rounded-lg"
                >
                  🏓 Record Match
                </button>
              )}
              
              {/* Leagues - Admin only for management */}
              {user.role === 'admin' && (
                <button 
                  onClick={() => navigate('/leagues')}
                  className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-4 px-4 rounded-lg"
                >
                  🏆 Manage Leagues
                </button>
              )}
              
              {/* League Signup - Students only */}
              {user.role === 'student' && (
                <button 
                  onClick={() => navigate('/league-signup')}
                  className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-4 px-4 rounded-lg"
                >
                  🏓 Join Leagues
                </button>
              )}
              
              {/* Ranking - Students only */}
              {user.role === 'student' && (
                <button 
                  onClick={() => navigate('/ranking')}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-4 px-4 rounded-lg"
                >
                  🏆 View Ranking
                </button>
              )}
              
              {/* Profile - Everyone */}
              <button 
                onClick={() => navigate('/profile')}
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-4 px-4 rounded-lg"
              >
                👤 Edit Profile
              </button>
            </div>
            
            {/* Role indicator */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Your Role:</strong> {user.role.charAt(0).toUpperCase() + user.role.slice(1)} 
                {user.role === 'student' && " - You can view skills assigned by coaches and see your ranking"}
                {user.role === 'coach' && " - You can manage student skills and rankings"}
                {user.role === 'admin' && " - You have full access to manage matches, leagues, and all features"}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function SkillsPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [skills, setSkills] = useState([])
  const [students, setStudents] = useState([])
  const [selectedStudent, setSelectedStudent] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newSkill, setNewSkill] = useState({ skillName: '', rating: 5, notes: '', studentId: '' })
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (!token) {
      navigate('/login')
      return
    }
    
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      
      // If user is a coach, fetch students list
      if (parsedUser.role === 'coach') {
        fetchStudents()
      }
    }

    fetchSkills()
  }, [navigate])

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(API_ENDPOINTS.SKILLS_STUDENTS, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setStudents(data.students)
      }
    } catch (error) {
      console.error('Error fetching students:', error)
    }
  }

  const fetchSkills = async (studentId = null) => {
    try {
      const token = localStorage.getItem('token')
      const url = studentId 
        ? `${API_ENDPOINTS.SKILLS}?studentId=${studentId}`
        : API_ENDPOINTS.SKILLS
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setSkills(data.skills)
      }
    } catch (error) {
      console.error('Error fetching skills:', error)
    } finally {
      setLoading(false)
    }
  }

  const addSkill = async (e) => {
    e.preventDefault()
    setMessage('')

    if (user.role === 'coach' && !newSkill.studentId) {
      setMessage('Please select a student')
      return
    }

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(API_ENDPOINTS.SKILLS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newSkill)
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Skill added successfully!')
        setNewSkill({ skillName: '', rating: 5, notes: '', studentId: '' })
        setShowAddForm(false)
        fetchSkills(selectedStudent)
      } else {
        setMessage(data.error?.message || 'Failed to add skill')
      }
    } catch (error) {
      setMessage('Error connecting to server')
    }
  }

  const deleteSkill = async (skillId) => {
    if (!confirm('Are you sure you want to delete this skill?')) return

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_ENDPOINTS.SKILLS}/${skillId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        setMessage('Skill deleted successfully!')
        fetchSkills()
      }
    } catch (error) {
      setMessage('Error deleting skill')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  const commonSkills = [
    'Forehand Drive', 'Backhand Drive', 'Forehand Loop', 'Backhand Loop', 
    'Serve', 'Return', 'Footwork', 'Defense', 'Spin Recognition', 'Mental Game'
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/dashboard')}
                className="text-blue-500 hover:text-blue-700"
              >
                ← Dashboard
              </button>
              <Logo size="small" showText={false} className="mr-2" />
        <h1 className="text-2xl font-bold text-gray-900">Skills Tracking</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user.firstName}!</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          
          {message && (
            <div className={`mb-4 p-3 rounded ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message}
            </div>
          )}

          {/* Coach/Admin Controls */}
          {(user.role === 'coach' || user.role === 'admin') && (
            <>
              {user.role === 'coach' && students.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Student</label>
                  <select
                    value={selectedStudent}
                    onChange={(e) => {
                      setSelectedStudent(e.target.value)
                      if (e.target.value) fetchSkills(e.target.value)
                    }}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">View All Students</option>
                    {students.map(student => (
                      <option key={student.id} value={student.id}>
                        {student.first_name} {student.last_name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="mb-6">
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  {showAddForm ? 'Cancel' : '+ Add New Skill'}
                </button>
              </div>
            </>
          )}

          {/* Student View Message */}
          {user.role === 'student' && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800">
                <strong>Note:</strong> Only coaches can add or modify your skills. The skills shown below have been assigned by your coaches.
              </p>
            </div>
          )}

          {/* Add Skill Form - Coach/Admin only */}
          {showAddForm && (user.role === 'coach' || user.role === 'admin') && (
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <h3 className="text-lg font-bold mb-4">Add New Skill</h3>
              <form onSubmit={addSkill} className="space-y-4">
                {user.role === 'coach' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Student</label>
                    <select
                      value={newSkill.studentId}
                      onChange={(e) => setNewSkill({...newSkill, studentId: e.target.value})}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a student</option>
                      {students.map(student => (
                        <option key={student.id} value={student.id}>
                          {student.first_name} {student.last_name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Skill Name</label>
                  <select
                    value={newSkill.skillName}
                    onChange={(e) => setNewSkill({...newSkill, skillName: e.target.value})}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a skill</option>
                    {commonSkills.map(skill => (
                      <option key={skill} value={skill}>{skill}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Rating (1-10): {newSkill.rating}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={newSkill.rating}
                    onChange={(e) => setNewSkill({...newSkill, rating: parseInt(e.target.value)})}
                    className="mt-1 block w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Notes (optional)</label>
                  <textarea
                    value={newSkill.notes}
                    onChange={(e) => setNewSkill({...newSkill, notes: e.target.value})}
                    rows="3"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add any notes about this skill..."
                  />
                </div>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add Skill
                </button>
              </form>
            </div>
          )}

          {/* Skills List */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Your Skills ({skills.length})</h2>
            </div>
            
            {loading ? (
              <div className="p-6 text-center text-gray-600">Loading skills...</div>
            ) : skills.length === 0 ? (
              <div className="p-6 text-center text-gray-600">
                {user.role === 'student' 
                  ? "No skills assigned yet. Your coaches will add skills here!" 
                  : "No skills found. Add skills for students to get started!"}
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {skills.map((skill) => (
                  <div key={skill.id} className="p-6 flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">{skill.skill_name}</h3>
                        {(user.role === 'coach' || user.role === 'admin') && skill.first_name && (
                          <span className="text-sm text-blue-600 font-medium">
                            {skill.first_name} {skill.last_name}
                          </span>
                        )}
                      </div>
                      <div className="mt-1 flex items-center">
                        <span className="text-sm text-gray-500">Rating: </span>
                        <div className="ml-2 flex items-center">
                          {[...Array(10)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-lg ${i < skill.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            >
                              ⭐
                            </span>
                          ))}
                          <span className="ml-2 text-sm font-medium">{skill.rating}/10</span>
                        </div>
                      </div>
                      {skill.notes && (
                        <p className="mt-2 text-sm text-gray-600">{skill.notes}</p>
                      )}
                      <p className="mt-1 text-xs text-gray-400">
                        Last updated: {new Date(skill.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                    {(user.role === 'coach' || user.role === 'admin') && (
                      <div className="ml-4">
                        <button
                          onClick={() => deleteSkill(skill.id)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

// Ranking Page - Students only
function RankingPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [rankings, setRankings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (!token) {
      navigate('/login')
      return
    }
    
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      
      // Only students can view rankings
      if (parsedUser.role !== 'student') {
        navigate('/dashboard')
        return
      }
    }

    fetchRankings()
  }, [navigate])

  const fetchRankings = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(API_ENDPOINTS.SKILLS, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setRankings(data.skills || [])
      }
    } catch (error) {
      console.error('Error fetching rankings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  const averageRating = rankings.length > 0 
    ? (rankings.reduce((sum, skill) => sum + skill.rating, 0) / rankings.length).toFixed(1)
    : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/dashboard')}
                className="text-blue-500 hover:text-blue-700"
              >
                ← Dashboard
              </button>
              <h1 className="text-2xl font-bold text-gray-900">🏆 Your Ranking</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user.firstName}!</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg mb-6">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Your Performance Summary</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{rankings.length}</div>
                  <div className="text-sm text-gray-600">Skills Evaluated</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{averageRating}</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    {averageRating >= 8 ? 'Advanced' : averageRating >= 6 ? 'Intermediate' : averageRating >= 4 ? 'Beginner' : 'Starting'}
                  </div>
                  <div className="text-sm text-gray-600">Level</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Skill Breakdown</h2>
            </div>
            {loading ? (
              <div className="p-6 text-center text-gray-600">Loading...</div>
            ) : rankings.length === 0 ? (
              <div className="p-6 text-center text-gray-600">
                No skills assigned yet. Your coaches will add skills here!
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {rankings.map((skill) => (
                  <div key={skill.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">{skill.skill_name}</h3>
                      <span className={`text-sm font-medium px-2 py-1 rounded ${
                        skill.rating >= 8 ? 'bg-green-100 text-green-800' :
                        skill.rating >= 6 ? 'bg-yellow-100 text-yellow-800' :
                        skill.rating >= 4 ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {skill.rating >= 8 ? 'Excellent' :
                         skill.rating >= 6 ? 'Good' :
                         skill.rating >= 4 ? 'Fair' :
                         'Needs Work'}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center">
                      <div className="flex items-center">
                        {[...Array(10)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-lg ${i < skill.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          >
                            ⭐
                          </span>
                        ))}
                        <span className="ml-2 text-sm font-medium">{skill.rating}/10</span>
                      </div>
                    </div>
                    {skill.notes && (
                      <p className="mt-2 text-sm text-gray-600">{skill.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

// Placeholder pages for admin functions
function MatchesPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (!token) {
      navigate('/login')
      return
    }
    
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      
      if (parsedUser.role !== 'admin') {
        navigate('/dashboard')
        return
      }
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  if (!user) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-gray-600">Loading...</div></div>

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate('/dashboard')} className="text-blue-500 hover:text-blue-700">← Dashboard</button>
              <h1 className="text-2xl font-bold text-gray-900">🏓 Match Management</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user.firstName}!</span>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <h2 className="text-2xl font-bold mb-4">Match Recording System</h2>
            <p className="text-gray-600">This feature will allow admins to record match results and update player statistics.</p>
            <p className="text-sm text-gray-500 mt-4">Coming soon...</p>
          </div>
        </div>
      </main>
    </div>
  )
}

function LeaguesPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [leagues, setLeagues] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingLeague, setEditingLeague] = useState(null)
  const [message, setMessage] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    day_of_week: 1,
    start_time: '19:00',
    end_time: '21:00',
    max_participants: 16,
    skill_level_min: 1,
    skill_level_max: 10,
    entry_fee: 0
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (!token) {
      navigate('/login')
      return
    }
    
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      
      if (parsedUser.role !== 'admin') {
        navigate('/dashboard')
        return
      }
    }
    
    fetchLeagues()
  }, [navigate])

  const fetchLeagues = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(API_ENDPOINTS.LEAGUES, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setLeagues(data.leagues)
      }
    } catch (error) {
      console.error('Error fetching leagues:', error)
      setMessage('Error fetching leagues')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    
    try {
      const token = localStorage.getItem('token')
      const url = editingLeague 
        ? `${API_ENDPOINTS.LEAGUES}/${editingLeague.id}`
        : API_ENDPOINTS.LEAGUES
      
      const method = editingLeague ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      
      if (response.ok) {
        setMessage(`League ${editingLeague ? 'updated' : 'created'} successfully!`)
        setShowCreateForm(false)
        setEditingLeague(null)
        setFormData({
          name: '',
          description: '',
          day_of_week: 1,
          start_time: '19:00',
          end_time: '21:00',
          max_participants: 16,
          skill_level_min: 1,
          skill_level_max: 10,
          entry_fee: 0
        })
        fetchLeagues()
      } else {
        setMessage(data.message || 'Error saving league')
      }
    } catch (error) {
      setMessage('Error saving league')
    }
  }

  const handleEdit = (league) => {
    setEditingLeague(league)
    setFormData({
      name: league.name,
      description: league.description || '',
      day_of_week: league.day_of_week,
      start_time: league.start_time,
      end_time: league.end_time,
      max_participants: league.max_participants,
      skill_level_min: league.skill_level_min,
      skill_level_max: league.skill_level_max,
      entry_fee: league.entry_fee
    })
    setShowCreateForm(true)
  }

  const handleDelete = async (leagueId) => {
    if (!confirm('Are you sure you want to delete this league?')) return
    
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_ENDPOINTS.LEAGUES}/${leagueId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()
      setMessage(data.message)
      fetchLeagues()
    } catch (error) {
      setMessage('Error deleting league')
    }
  }

  const handleToggleActive = async (league) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_ENDPOINTS.LEAGUES}/${league.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ is_active: !league.is_active })
      })

      if (response.ok) {
        setMessage(`League ${!league.is_active ? 'activated' : 'deactivated'} successfully!`)
        fetchLeagues()
      }
    } catch (error) {
      setMessage('Error updating league status')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  const getDayName = (dayNumber) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return days[dayNumber]
  }

  if (!user) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-gray-600">Loading...</div></div>

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate('/dashboard')} className="text-blue-500 hover:text-blue-700">← Dashboard</button>
              <h1 className="text-2xl font-bold text-gray-900">🏆 League Management</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user.firstName}!</span>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {message && (
            <div className={`mb-4 p-3 rounded ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message}
            </div>
          )}

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">League Templates</h2>
            <div className="space-x-4">
              <button
                onClick={() => navigate('/league-signup')}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                View Public Page
              </button>
              <button
                onClick={() => {
                  setShowCreateForm(!showCreateForm)
                  setEditingLeague(null)
                  setFormData({
                    name: '',
                    description: '',
                    day_of_week: 1,
                    start_time: '19:00',
                    end_time: '21:00',
                    max_participants: 16,
                    skill_level_min: 1,
                    skill_level_max: 10,
                    entry_fee: 0
                  })
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {showCreateForm ? 'Cancel' : 'Create New League'}
              </button>
            </div>
          </div>

          {showCreateForm && (
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <h3 className="text-lg font-bold mb-4">{editingLeague ? 'Edit League' : 'Create New League'}</h3>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">League Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Day of Week</label>
                  <select
                    value={formData.day_of_week}
                    onChange={(e) => setFormData({...formData, day_of_week: parseInt(e.target.value)})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={0}>Sunday</option>
                    <option value={1}>Monday</option>
                    <option value={2}>Tuesday</option>
                    <option value={3}>Wednesday</option>
                    <option value={4}>Thursday</option>
                    <option value={5}>Friday</option>
                    <option value={6}>Saturday</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Time</label>
                  <input
                    type="time"
                    value={formData.start_time}
                    onChange={(e) => setFormData({...formData, start_time: e.target.value})}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">End Time</label>
                  <input
                    type="time"
                    value={formData.end_time}
                    onChange={(e) => setFormData({...formData, end_time: e.target.value})}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Max Participants</label>
                  <input
                    type="number"
                    min="4"
                    max="50"
                    value={formData.max_participants}
                    onChange={(e) => setFormData({...formData, max_participants: parseInt(e.target.value)})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Entry Fee ($)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.entry_fee}
                    onChange={(e) => setFormData({...formData, entry_fee: parseFloat(e.target.value)})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Min Skill Level</label>
                  <select
                    value={formData.skill_level_min}
                    onChange={(e) => setFormData({...formData, skill_level_min: parseInt(e.target.value)})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Max Skill Level</label>
                  <select
                    value={formData.skill_level_max}
                    onChange={(e) => setFormData({...formData, skill_level_max: parseInt(e.target.value)})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows="3"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="League description..."
                  />
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    {editingLeague ? 'Update League' : 'Create League'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {loading ? (
            <div className="text-center py-8">Loading leagues...</div>
          ) : (
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Existing Leagues ({leagues.length})</h3>
              </div>
              
              {leagues.length === 0 ? (
                <div className="p-6 text-center text-gray-600">
                  No leagues created yet. Create your first league to get started!
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {leagues.map((league) => (
                    <div key={league.id} className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="text-lg font-medium text-gray-900">{league.name}</h4>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              league.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {league.is_active ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                          <p className="text-gray-600 mt-1">{league.description}</p>
                          <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                            <div><strong>Day:</strong> {getDayName(league.day_of_week)}</div>
                            <div><strong>Time:</strong> {league.start_time} - {league.end_time}</div>
                            <div><strong>Max Players:</strong> {league.max_participants}</div>
                            <div><strong>Fee:</strong> ${league.entry_fee}</div>
                            <div><strong>Skill Range:</strong> {league.skill_level_min}-{league.skill_level_max}</div>
                            <div><strong>Total Instances:</strong> {league.total_instances}</div>
                            <div><strong>Total Registrations:</strong> {league.total_registrations}</div>
                          </div>
                        </div>
                        
                        <div className="ml-4 flex space-x-2">
                          <button
                            onClick={() => handleEdit(league)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleToggleActive(league)}
                            className={`font-bold py-1 px-3 rounded text-sm ${
                              league.is_active 
                                ? 'bg-orange-500 hover:bg-orange-700 text-white' 
                                : 'bg-green-500 hover:bg-green-700 text-white'
                            }`}
                          >
                            {league.is_active ? 'Deactivate' : 'Activate'}
                          </button>
                          <button
                            onClick={() => handleDelete(league.id)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

function LeagueSignupPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-gray-900">🏓 League Signup</h1>
            <button onClick={() => navigate('/')} className="text-blue-500 hover:text-blue-700">Back to Home</button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <h2 className="text-2xl font-bold mb-4">Join Our Table Tennis Leagues!</h2>
            <p className="text-gray-600 mb-6">No login required - anyone can sign up for our exciting table tennis competitions.</p>
            <p className="text-sm text-gray-500">League signup feature coming soon...</p>
          </div>
        </div>
      </main>
    </div>
  )
}

function ProfilePage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (!token) {
      navigate('/login')
      return
    }
    
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  if (!user) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-gray-600">Loading...</div></div>

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate('/dashboard')} className="text-blue-500 hover:text-blue-700">← Dashboard</button>
              <h1 className="text-2xl font-bold text-gray-900">👤 Profile</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user.firstName}!</span>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">User Profile</h2>
            <div className="space-y-4">
              <div><strong>Name:</strong> {user.firstName} {user.lastName}</div>
              <div><strong>Email:</strong> {user.email}</div>
              <div><strong>Role:</strong> {user.role.charAt(0).toUpperCase() + user.role.slice(1)}</div>
            </div>
            <div className="mt-6">
              <p className="text-sm text-gray-500">Profile editing feature coming soon...</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App