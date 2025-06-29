import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Logo from './components/Logo'
import PublicLeagueSignup from './components/PublicLeagueSignup'
import SkillsRedesigned from './components/SkillsRedesigned'
import BadgeSystem from './components/BadgeSystem'
import Leaderboard from './components/Leaderboard'
import { API_ENDPOINTS } from './config/api'
import { 
  TableTennisIcon, 
  TrophyIcon, 
  AcademicCapIcon, 
  ChartBarIcon, 
  UserIcon, 
  UsersIcon, 
  BriefcaseIcon, 
  StarIcon, 
  CalendarIcon, 
  ClockIcon, 
  TargetIcon, 
  MapPinIcon, 
  DollarIcon, 
  TrendingUpIcon, 
  SettingsIcon, 
  PlayIcon 
} from './components/icons'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/skills" element={<SkillsRedesigned />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/matches" element={<MatchesPage />} />
        <Route path="/leagues" element={<LeaguesPage />} />
        <Route path="/leagues/signup" element={<LeagueSignupPage />} />
        <Route path="/league-signup" element={<PublicLeagueSignup />} />
        <Route path="/league-signups" element={<LeagueSignupsManagement />} />
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
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl shadow-lg transform hover:scale-105 transition-all duration-200 mr-4 inline-flex items-center gap-3"
            >
              <TableTennisIcon className="w-6 h-6" color="white" />
              Join This Week's Leagues
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-xl shadow-lg transform hover:scale-105 transition-all duration-200 inline-flex items-center gap-3"
            >
              <UserIcon className="w-6 h-6" color="white" />
              Member Login
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
              <div className="flex justify-center mb-4">
                <TableTennisIcon className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Weekly Leagues</h3>
              <p className="text-gray-600">Competitive and social leagues for all skill levels. Sign up weekly, no long-term commitment required.</p>
            </div>
            
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="flex justify-center mb-4">
                <AcademicCapIcon className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Professional Coaching</h3>
              <p className="text-gray-600">Learn from certified coaches who track your progress and help you improve specific skills.</p>
            </div>
            
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="flex justify-center mb-4">
                <ChartBarIcon className="w-12 h-12 text-purple-600" />
              </div>
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
              <div className="flex justify-center mb-4">
                <UserIcon className="w-16 h-16 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-blue-600">Student</h3>
              <p className="text-gray-600 mb-6">Join leagues, track your skills, and improve your game with professional coaching.</p>
              <button 
                onClick={() => navigate('/login?role=student')}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg inline-flex items-center justify-center gap-2"
              >
                <UserIcon className="w-5 h-5" color="white" />
                Student Login
              </button>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="flex justify-center mb-4">
                <AcademicCapIcon className="w-16 h-16 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-green-600">Coach</h3>
              <p className="text-gray-600 mb-6">Manage student progress, assign skill ratings, and help players reach their potential.</p>
              <button 
                onClick={() => navigate('/login?role=coach')}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg inline-flex items-center justify-center gap-2"
              >
                <AcademicCapIcon className="w-5 h-5" color="white" />
                Coach Login
              </button>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="flex justify-center mb-4">
                <BriefcaseIcon className="w-16 h-16 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-purple-600">Admin</h3>
              <p className="text-gray-600 mb-6">Manage leagues, oversee operations, and maintain the academy's systems.</p>
              <button 
                onClick={() => navigate('/login?role=admin')}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg inline-flex items-center justify-center gap-2"
              >
                <BriefcaseIcon className="w-5 h-5" color="white" />
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
      case 'student': return <UserIcon className="w-16 h-16 text-blue-600" />
      case 'coach': return <AcademicCapIcon className="w-16 h-16 text-green-600" />
      case 'admin': return <BriefcaseIcon className="w-16 h-16 text-purple-600" />
      default: return <UserIcon className="w-16 h-16 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-xl">
        <div className="text-center">
          <Logo size="medium" showText={false} className="mb-4" />
          {expectedRole ? (
            <div className="mb-6">
              <div className="flex justify-center mb-4">{getRoleIcon(expectedRole)}</div>
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
          {/* Only show register toggle for non-role-specific logins or student logins */}
          {(!expectedRole || expectedRole === 'student') && (
            <>
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-500 hover:text-blue-700"
              >
                {isLogin ? 'Need an account? Register' : 'Already have an account? Sign In'}
              </button>
              <br />
            </>
          )}
          
          {/* Show helpful message for coach/admin role-specific logins */}
          {expectedRole && expectedRole !== 'student' && isLogin && (
            <>
              <p className="text-sm text-gray-600">
                {expectedRole === 'coach' ? 'Coach' : 'Admin'} accounts are created by the system administrator.
              </p>
              <p className="text-xs text-gray-500">
                Don't have an account? Contact the admin for access.
              </p>
              <br />
            </>
          )}
          
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
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <ChartBarIcon className="w-6 h-6 text-purple-600" />
              Skill Tracking
            </h3>
            <p className="text-gray-600">Track your progress across different table tennis skills and techniques.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <TableTennisIcon className="w-6 h-6 text-blue-600" />
              League Management
            </h3>
            <p className="text-gray-600">Join leagues, compete with other players, and climb the rankings.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <TrendingUpIcon className="w-6 h-6 text-green-600" />
              Match Analytics
            </h3>
            <p className="text-gray-600">Analyze your match performance and identify areas for improvement.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <UsersIcon className="w-6 h-6 text-orange-600" />
              Community
            </h3>
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
  const [greeting, setGreeting] = useState('')

  // Function to get time-based greeting
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) return 'Good morning'
    if (hour >= 12 && hour < 17) return 'Good afternoon'
    if (hour >= 17 && hour < 22) return 'Good evening'
    return 'Good night'
  }

  // Function to get role-specific icon
  const getRoleIcon = (role) => {
    switch(role) {
      case 'student': return (
        <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
          S
        </div>
      )
      case 'coach': return (
        <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
          C
        </div>
      )
      case 'admin': return (
        <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
          A
        </div>
      )
      default: return (
        <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
          U
        </div>
      )
    }
  }

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
    
    // Set initial greeting and update every minute
    setGreeting(getTimeBasedGreeting())
    const greetingInterval = setInterval(() => {
      setGreeting(getTimeBasedGreeting())
    }, 60000) // Update every minute
    
    return () => clearInterval(greetingInterval)
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
              <div className="flex items-center space-x-2 text-gray-700">
                {getRoleIcon(user.role)}
                <span className="font-medium">
                  {greeting}, {user.firstName}!
                </span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full capitalize">
                  {user.role}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
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
          <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h2>
            
            {/* Role-specific Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {user.role === 'admin' && (
                <>
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <UserIcon className="w-8 h-8 text-blue-600" />
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
                          <AcademicCapIcon className="w-8 h-8 text-green-600" />
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
                          <TrophyIcon className="w-8 h-8 text-purple-600" />
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
                          <ChartBarIcon className="w-8 h-8 text-gray-600" />
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
                          <TrendingUpIcon className="w-8 h-8 text-green-600" />
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


              {user.role === 'student' && (
                <>
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <TrophyIcon className="w-8 h-8 text-purple-600" />
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
                          <StarIcon className="w-8 h-8 text-yellow-600" />
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
                          <TableTennisIcon className="w-8 h-8 text-blue-600" />
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
              {/* Skills - Students view only, Coaches can manage, Admins can view */}
              <button 
                onClick={() => navigate('/skills')}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-lg inline-flex items-center justify-center gap-2"
              >
                <ChartBarIcon className="w-5 h-5" color="white" />
                {user.role === 'coach' ? 'Manage Students' : user.role === 'admin' ? 'View Skill Metrics' : 'Skill Metrics'}
              </button>
              
              {/* Matches - Admin only */}
              {user.role === 'admin' && (
                <button 
                  onClick={() => navigate('/matches')}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-4 rounded-lg inline-flex items-center justify-center gap-2"
                >
                  <PlayIcon className="w-5 h-5" color="white" />
                  Record Match
                </button>
              )}
              
              {/* Leagues - Admin only for management */}
              {user.role === 'admin' && (
                <button 
                  onClick={() => navigate('/leagues')}
                  className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-4 px-4 rounded-lg inline-flex items-center justify-center gap-2"
                >
                  <TrophyIcon className="w-5 h-5" color="white" />
                  Manage Leagues
                </button>
              )}
              
              {/* League Signup - Students only */}
              {user.role === 'student' && (
                <button 
                  onClick={() => navigate('/league-signup')}
                  className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-4 px-4 rounded-lg inline-flex items-center justify-center gap-2"
                >
                  <TableTennisIcon className="w-5 h-5" color="white" />
                  Join Leagues
                </button>
              )}
              
              {/* Leaderboard - All roles */}
              <button 
                onClick={() => navigate('/leaderboard')}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-4 px-4 rounded-lg inline-flex items-center justify-center gap-2"
              >
                <TrophyIcon className="w-5 h-5" color="white" />
                Leaderboard
              </button>
              
              
              {/* Profile - Everyone */}
              <button 
                onClick={() => navigate('/profile')}
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-4 px-4 rounded-lg inline-flex items-center justify-center gap-2"
              >
                <SettingsIcon className="w-5 h-5" color="white" />
                Edit Profile
              </button>
            </div>
            
            {/* Student Badges */}
            {user.role === 'student' && (
              <div className="mt-6">
                <BadgeSystem 
                  studentId={user.id} 
                  currentUser={user}
                  isManageView={false}
                />
              </div>
            )}
            
            {/* Role indicator */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Your Role:</strong> {user.role.charAt(0).toUpperCase() + user.role.slice(1)} 
                {user.role === 'student' && " - You can view skills assigned by coaches and see your performance"}
                {user.role === 'coach' && " - You can manage student skills, assign badges, and add comments"}
                {user.role === 'admin' && " - You can manage leagues and view skill metrics overview"}
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
  
  // Function to get time-based greeting
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) return 'Good morning'
    if (hour >= 12 && hour < 17) return 'Good afternoon'
    if (hour >= 17 && hour < 22) return 'Good evening'
    return 'Good night'
  }

  // Function to get role-specific icon
  const getRoleIcon = (role) => {
    switch(role) {
      case 'student': return (
        <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
          S
        </div>
      )
      case 'coach': return (
        <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
          C
        </div>
      )
      case 'admin': return (
        <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
          A
        </div>
      )
      default: return (
        <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
          U
        </div>
      )
    }
  }

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
      
      // If user is a coach or admin, fetch students list
      if (parsedUser.role === 'coach' || parsedUser.role === 'admin') {
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

    if ((user.role === 'coach' || user.role === 'admin') && !newSkill.studentId) {
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
              <div className="flex items-center space-x-2 text-gray-700">
                {getRoleIcon(user.role)}
                <span className="font-medium">
                  {getTimeBasedGreeting()}, {user.firstName}!
                </span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full capitalize">
                  {user.role}
                </span>
              </div>
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
              {(user.role === 'coach' || user.role === 'admin') && students.length > 0 && (
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
                <strong>Note:</strong> Only coaches and admins can add or modify your skills. The skills shown below have been assigned by your coaches or admins.
              </p>
            </div>
          )}

          {/* Add Skill Form - Coach/Admin only */}
          {showAddForm && (user.role === 'coach' || user.role === 'admin') && (
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <h3 className="text-lg font-bold mb-4">Add New Skill</h3>
              <form onSubmit={addSkill} className="space-y-4">
                {(user.role === 'coach' || user.role === 'admin') && (
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
                            <StarIcon
                              key={i}
                              className={`w-5 h-5 ${i < skill.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                              filled={i < skill.rating}
                            />
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


// Placeholder pages for admin functions
function MatchesPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  
  // Function to get time-based greeting
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) return 'Good morning'
    if (hour >= 12 && hour < 17) return 'Good afternoon'
    if (hour >= 17 && hour < 22) return 'Good evening'
    return 'Good night'
  }

  // Function to get role-specific icon
  const getRoleIcon = (role) => {
    switch(role) {
      case 'student': return (
        <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
          S
        </div>
      )
      case 'coach': return (
        <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
          C
        </div>
      )
      case 'admin': return (
        <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
          A
        </div>
      )
      default: return (
        <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
          U
        </div>
      )
    }
  }

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
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <PlayIcon className="w-8 h-8 text-blue-600" />
                Match Management
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-700">
                {getRoleIcon(user.role)}
                <span className="font-medium">
                  {getTimeBasedGreeting()}, {user.firstName}!
                </span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full capitalize">
                  {user.role}
                </span>
              </div>
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
  
  // Function to get time-based greeting
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) return 'Good morning'
    if (hour >= 12 && hour < 17) return 'Good afternoon'
    if (hour >= 17 && hour < 22) return 'Good evening'
    return 'Good night'
  }

  // Function to get role-specific icon
  const getRoleIcon = (role) => {
    switch(role) {
      case 'student': return (
        <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
          S
        </div>
      )
      case 'coach': return (
        <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
          C
        </div>
      )
      case 'admin': return (
        <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
          A
        </div>
      )
      default: return (
        <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
          U
        </div>
      )
    }
  }

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    day_of_week: 1,
    start_time: '19:00',
    end_time: '21:00',
    max_participants: 16,
    skill_level_min: 0,
    skill_level_max: 3000,
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
    
    // Debug: Log form data being submitted
    console.log('Submitting form data:', formData)
    
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
          skill_level_min: 0,
          skill_level_max: 3000,
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
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <TrophyIcon className="w-8 h-8 text-purple-600" />
                League Management
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-700">
                {getRoleIcon(user.role)}
                <span className="font-medium">
                  {getTimeBasedGreeting()}, {user.firstName}!
                </span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full capitalize">
                  {user.role}
                </span>
              </div>
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
                onClick={() => navigate('/league-signups')}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Manage Signups
              </button>
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
                    skill_level_min: 0,
                    skill_level_max: 3000,
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
                  <label className="block text-sm font-medium text-gray-700">Min USATT Rating</label>
                  <input
                    type="number"
                    min="0"
                    max="3000"
                    step="1"
                    value={formData.skill_level_min}
                    onChange={(e) => setFormData({...formData, skill_level_min: parseInt(e.target.value) || 0})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter minimum rating (0-3000)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Max USATT Rating</label>
                  <input
                    type="number"
                    min="0"
                    max="3000"
                    step="1"
                    value={formData.skill_level_max}
                    onChange={(e) => setFormData({...formData, skill_level_max: parseInt(e.target.value) || 0})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter maximum rating (0-3000)"
                  />
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
                            <div><strong>USATT Rating:</strong> {league.skill_level_min}-{league.skill_level_max}</div>
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
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <TableTennisIcon className="w-8 h-8 text-blue-600" />
              League Signup
            </h1>
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
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  
  // Function to get time-based greeting
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) return 'Good morning'
    if (hour >= 12 && hour < 17) return 'Good afternoon'
    if (hour >= 17 && hour < 22) return 'Good evening'
    return 'Good night'
  }

  // Function to get role-specific icon
  const getRoleIcon = (role) => {
    switch(role) {
      case 'student': return (
        <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
          S
        </div>
      )
      case 'coach': return (
        <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
          C
        </div>
      )
      case 'admin': return (
        <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
          A
        </div>
      )
      default: return (
        <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
          U
        </div>
      )
    }
  }

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

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    setMessage('')
    
    // Validation
    if (passwordData.newPassword.length < 6) {
      setMessage('New password must be at least 6 characters long')
      return
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage('New passwords do not match')
      return
    }
    
    if (passwordData.currentPassword === passwordData.newPassword) {
      setMessage('New password must be different from current password')
      return
    }
    
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_ENDPOINTS.AUTH}/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setMessage('Password changed successfully!')
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
        setShowPasswordForm(false)
        setTimeout(() => setMessage(''), 5000)
      } else {
        setMessage(data.error?.message || 'Failed to change password')
      }
    } catch (error) {
      setMessage('Error connecting to server')
    } finally {
      setLoading(false)
    }
  }

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
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <UserIcon className="w-8 h-8 text-blue-600" />
                Profile Settings
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-700">
                {getRoleIcon(user.role)}
                <span className="font-medium">
                  {getTimeBasedGreeting()}, {user.firstName}!
                </span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full capitalize">
                  {user.role}
                </span>
              </div>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.includes('successfully') 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-red-100 text-red-700 border border-red-200'
            }`}>
              <div className="flex items-center">
                <span className="mr-2">{message.includes('successfully') ? '✅' : '❌'}</span>
                {message}
              </div>
            </div>
          )}
          
          {/* Profile Information */}
          <div className="bg-white p-8 rounded-lg shadow mb-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Profile Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <UserIcon className="w-6 h-6 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <span className="w-6 h-6 text-gray-400 mr-3">📧</span>
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-medium text-gray-900">{user.email}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <span className="w-6 h-6 text-gray-400 mr-3">
                    {user.role === 'student' ? '🎓' : user.role === 'coach' ? '👨‍🏫' : '👑'}
                  </span>
                  <div>
                    <p className="text-sm text-gray-500">Role</p>
                    <p className="font-medium text-gray-900">
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <span className="w-6 h-6 text-gray-400 mr-3">🆔</span>
                  <div>
                    <p className="text-sm text-gray-500">User ID</p>
                    <p className="font-medium text-gray-900">#{user.id}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Password Change Section */}
          <div className="bg-white p-8 rounded-lg shadow">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Security Settings</h2>
              {!showPasswordForm && (
                <button
                  onClick={() => setShowPasswordForm(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center gap-2 transition-colors"
                >
                  <span>🔐</span>
                  Change Password
                </button>
              )}
            </div>
            
            {showPasswordForm ? (
              <form onSubmit={handlePasswordChange} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your current password"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      required
                      minLength="6"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter new password (min 6 chars)"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Confirm your new password"
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg inline-flex items-center gap-2 transition-colors"
                  >
                    {loading ? (
                      <>
                        <span className="animate-spin">⏳</span>
                        Updating...
                      </>
                    ) : (
                      <>
                        <span>✅</span>
                        Update Password
                      </>
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordForm(false)
                      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
                      setMessage('')
                    }}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg inline-flex items-center gap-2 transition-colors"
                  >
                    <span>❌</span>
                    Cancel
                  </button>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Password Requirements:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Minimum 6 characters long</li>
                    <li>• Must be different from your current password</li>
                    <li>• Should be unique and not easily guessable</li>
                  </ul>
                </div>
              </form>
            ) : (
              <div className="text-center py-8">
                <span className="text-6xl mb-4 block">🔐</span>
                <p className="text-gray-600 mb-4">Keep your account secure by regularly updating your password.</p>
                <p className="text-sm text-gray-500">Last password change: Not tracked (for privacy)</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

function LeagueSignupsManagement() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [leagues, setLeagues] = useState([])
  const [selectedLeague, setSelectedLeague] = useState(null)
  const [signups, setSignups] = useState([])
  const [groups, setGroups] = useState([])
  const [groupingMethod, setGroupingMethod] = useState('middle') // 'middle' or 'snake'
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState({})
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  // Function to get time-based greeting
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) return 'Good morning'
    if (hour >= 12 && hour < 17) return 'Good afternoon'
    if (hour >= 17 && hour < 22) return 'Good evening'
    return 'Good night'
  }

  // Function to get role-specific icon
  const getRoleIcon = (role) => {
    switch(role) {
      case 'student': return (
        <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
          S
        </div>
      )
      case 'coach': return (
        <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
          C
        </div>
      )
      case 'admin': return (
        <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
          A
        </div>
      )
      default: return (
        <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
          U
        </div>
      )
    }
  }

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
      
      fetchLeagues()
    }
  }, [navigate])

  const fetchLeagues = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/public/leagues', {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        const data = await response.json()
        setLeagues(data.filter(league => league.actual_participants > 0))
      }
    } catch (error) {
      console.error('Error fetching leagues:', error)
      setMessage('Error fetching leagues')
    } finally {
      setLoading(false)
    }
  }

  const fetchSignups = async (leagueId) => {
    try {
      const response = await fetch(`/api/public/leagues/${leagueId}/registrations`)
      
      if (response.ok) {
        const data = await response.json()
        setSignups(data)
        generateGroups(data)
      }
    } catch (error) {
      console.error('Error fetching signups:', error)
      setMessage('Error fetching signups')
    }
  }

  const generateGroups = (players) => {
    if (players.length === 0) {
      setGroups([])
      return
    }

    // Sort players by skill level (descending)
    const sortedPlayers = [...players].sort((a, b) => b.skill_level - a.skill_level)
    
    if (players.length <= 8) {
      // Single group
      setGroups([{ id: 1, name: 'Group 1', players: sortedPlayers }])
    } else {
      // Two groups
      const group1 = []
      const group2 = []
      
      if (groupingMethod === 'middle') {
        // Split at middle rating
        const midPoint = Math.floor(sortedPlayers.length / 2)
        group1.push(...sortedPlayers.slice(0, midPoint))
        group2.push(...sortedPlayers.slice(midPoint))
      } else {
        // Snake seeding (1st to Group 1, 2nd to Group 2, 3rd to Group 2, 4th to Group 1, etc.)
        sortedPlayers.forEach((player, index) => {
          if (index % 4 === 0 || index % 4 === 3) {
            group1.push(player)
          } else {
            group2.push(player)
          }
        })
      }
      
      setGroups([
        { id: 1, name: 'Group 1', players: group1 },
        { id: 2, name: 'Group 2', players: group2 }
      ])
    }
  }

  const handleGroupingMethodChange = (method) => {
    setGroupingMethod(method)
    generateGroups(signups)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  const generateMatchResults = () => {
    const newResults = {}
    
    groups.forEach(group => {
      newResults[group.id] = {}
      
      // Generate round-robin matches for each group
      for (let i = 0; i < group.players.length; i++) {
        for (let j = i + 1; j < group.players.length; j++) {
          const matchKey = `${group.players[i].id}-${group.players[j].id}`
          newResults[group.id][matchKey] = {
            player1: group.players[i],
            player2: group.players[j],
            score1: '',
            score2: ''
          }
        }
      }
    })
    
    setResults(newResults)
    setShowResults(true)
  }

  const updateResult = (groupId, matchKey, field, value) => {
    setResults(prev => ({
      ...prev,
      [groupId]: {
        ...prev[groupId],
        [matchKey]: {
          ...prev[groupId][matchKey],
          [field]: value
        }
      }
    }))
  }

  const calculateStandings = (groupId) => {
    const groupResults = results[groupId] || {}
    const group = groups.find(g => g.id === groupId)
    if (!group) return []

    // Initialize player stats
    const playerStats = {}
    group.players.forEach(player => {
      playerStats[player.id] = {
        player,
        wins: 0,
        losses: 0,
        gamesWon: 0,
        gamesLost: 0,
        points: 0
      }
    })

    // Calculate stats from match results
    Object.entries(groupResults).forEach(([matchKey, match]) => {
      const score1 = parseInt(match.score1) || 0
      const score2 = parseInt(match.score2) || 0
      
      // Only count if both scores are entered
      if (match.score1 !== '' && match.score2 !== '') {
        const player1Id = match.player1.id
        const player2Id = match.player2.id
        
        playerStats[player1Id].gamesWon += score1
        playerStats[player1Id].gamesLost += score2
        playerStats[player2Id].gamesWon += score2
        playerStats[player2Id].gamesLost += score1
        
        // Determine match winner (best of 3, 5, 7, etc. - for now simple highest score wins)
        if (score1 > score2) {
          playerStats[player1Id].wins += 1
          playerStats[player2Id].losses += 1
          playerStats[player1Id].points += 2 // 2 points for win
        } else if (score2 > score1) {
          playerStats[player2Id].wins += 1
          playerStats[player1Id].losses += 1
          playerStats[player2Id].points += 2 // 2 points for win
        } else if (score1 === score2 && score1 > 0) {
          // Tie game - 1 point each
          playerStats[player1Id].points += 1
          playerStats[player2Id].points += 1
        }
      }
    })

    // Sort by points (wins), then by games won/lost ratio
    return Object.values(playerStats).sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points
      if (b.wins !== a.wins) return b.wins - a.wins
      const aRatio = a.gamesLost === 0 ? a.gamesWon : a.gamesWon / a.gamesLost
      const bRatio = b.gamesLost === 0 ? b.gamesWon : b.gamesWon / b.gamesLost
      return bRatio - aRatio
    })
  }

  const printResults = () => {
    const printWindow = window.open('', '_blank')
    const printContent = generatePrintableResults()
    
    printWindow.document.write(`
      <html>
        <head>
          <title>League Results - ${selectedLeague?.name}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { border-collapse: collapse; width: 100%; margin-bottom: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .group-header { background-color: #e3f2fd; font-weight: bold; }
            .match-result { text-align: center; }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `)
    
    printWindow.document.close()
    printWindow.print()
  }

  const generatePrintableResults = () => {
    let html = `<h1>League Results: ${selectedLeague?.name}</h1>`
    html += `<p>Date: ${new Date().toLocaleDateString()}</p>`
    
    groups.forEach(group => {
      html += `<h2>${group.name} (${group.players.length} players)</h2>`
      
      // Add standings table
      const standings = calculateStandings(group.id)
      if (standings.length > 0 && standings.some(s => s.wins > 0 || s.losses > 0)) {
        html += '<h3>Final Standings</h3>'
        html += '<table style="margin-bottom: 20px;">'
        html += '<tr><th>Rank</th><th>Player</th><th>Wins</th><th>Losses</th><th>Points</th><th>Games W-L</th></tr>'
        
        standings.forEach((standing, index) => {
          const rankDisplay = index === 0 ? '🥇 1st' : index === 1 ? '🥈 2nd' : `${index + 1}${getOrdinalSuffix(index + 1)}`
          html += `
            <tr>
              <td style="text-align: center; font-weight: bold;">${rankDisplay}</td>
              <td>${standing.player.first_name} ${standing.player.last_name}</td>
              <td style="text-align: center;">${standing.wins}</td>
              <td style="text-align: center;">${standing.losses}</td>
              <td style="text-align: center;">${standing.points}</td>
              <td style="text-align: center;">${standing.gamesWon}-${standing.gamesLost}</td>
            </tr>
          `
        })
        
        html += '</table>'
      }
      
      // Add match results table
      html += '<h3>Match Results</h3>'
      html += '<table>'
      html += '<tr><th>Player 1</th><th>Score</th><th>Player 2</th><th>Score</th></tr>'
      
      const groupResults = results[group.id] || {}
      Object.entries(groupResults).forEach(([matchKey, match]) => {
        html += `
          <tr>
            <td>${match.player1.first_name} ${match.player1.last_name}</td>
            <td class="match-result">${match.score1}</td>
            <td>${match.player2.first_name} ${match.player2.last_name}</td>
            <td class="match-result">${match.score2}</td>
          </tr>
        `
      })
      
      html += '</table>'
    })
    
    return html
  }

  const getOrdinalSuffix = (num) => {
    const j = num % 10
    const k = num % 100
    if (j === 1 && k !== 11) return 'st'
    if (j === 2 && k !== 12) return 'nd'
    if (j === 3 && k !== 13) return 'rd'
    return 'th'
  }

  if (!user) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-gray-600">Loading...</div></div>

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate('/leagues')} className="text-blue-500 hover:text-blue-700">← League Management</button>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <UsersIcon className="w-8 h-8 text-blue-600" />
                League Signups Management
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-700">
                {getRoleIcon(user.role)}
                <span className="font-medium">
                  {getTimeBasedGreeting()}, {user.firstName}!
                </span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full capitalize">
                  {user.role}
                </span>
              </div>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {message && (
            <div className={`mb-4 p-3 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {message}
            </div>
          )}

          {/* League Selection */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Select League</h2>
            {loading ? (
              <p className="text-gray-600">Loading leagues...</p>
            ) : leagues.length === 0 ? (
              <p className="text-gray-600">No leagues with signups found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {leagues.map(league => (
                  <button
                    key={league.id}
                    onClick={() => {
                      setSelectedLeague(league)
                      fetchSignups(league.id)
                      setShowResults(false)
                    }}
                    className={`p-4 rounded-lg border-2 text-left transition-colors ${
                      selectedLeague?.id === league.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <h3 className="font-medium text-gray-900">{league.name}</h3>
                    <p className="text-sm text-gray-600">{league.actual_participants} signups</p>
                    <p className="text-xs text-gray-500">
                      {new Date(league.league_date).toLocaleDateString()}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Grouping Options */}
          {selectedLeague && signups.length > 8 && (
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Grouping Method</h2>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="middle"
                    checked={groupingMethod === 'middle'}
                    onChange={(e) => handleGroupingMethodChange(e.target.value)}
                    className="mr-2"
                  />
                  Split at middle rating (higher rated players in Group 1)
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="snake"
                    checked={groupingMethod === 'snake'}
                    onChange={(e) => handleGroupingMethodChange(e.target.value)}
                    className="mr-2"
                  />
                  Snake seeding (balanced groups by rating)
                </label>
              </div>
            </div>
          )}

          {/* Groups Display */}
          {groups.length > 0 && (
            <div className="space-y-6">
              {groups.map(group => (
                <div key={group.id} className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {group.name} ({group.players.length} players)
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Player
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Rating
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Registration Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {group.players.map((player, index) => (
                          <tr key={player.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {player.first_name} {player.last_name}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {player.skill_level}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {player.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {new Date(player.registration_date).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}

              {/* Generate Results Button */}
              <div className="flex justify-center">
                <button
                  onClick={generateMatchResults}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg"
                >
                  Generate Match Results Table
                </button>
              </div>
            </div>
          )}

          {/* Results Entry Table */}
          {showResults && (
            <div className="mt-6 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Match Results</h2>
                <button
                  onClick={printResults}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Print Results
                </button>
              </div>

              {/* Live Standings */}
              {groups.map(group => {
                const standings = calculateStandings(group.id)
                const hasResults = standings.some(s => s.wins > 0 || s.losses > 0)
                
                return hasResults && (
                  <div key={`standings-${group.id}`} className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {group.name} - Current Standings
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Rank
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Player
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Wins
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Losses
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Points
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Games W-L
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {standings.map((standing, index) => (
                            <tr key={standing.player.id} className={index < 2 ? 'bg-yellow-50' : ''}>
                              <td className="px-6 py-4 whitespace-nowrap text-center">
                                {index === 0 ? (
                                  <span className="text-2xl">🥇</span>
                                ) : index === 1 ? (
                                  <span className="text-2xl">🥈</span>
                                ) : index === 2 ? (
                                  <span className="text-2xl">🥉</span>
                                ) : (
                                  <span className="text-lg font-bold text-gray-600">{index + 1}</span>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                  {standing.player.first_name} {standing.player.last_name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  Rating: {standing.player.skill_level}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-center">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  {standing.wins}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-center">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                  {standing.losses}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-center">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {standing.points}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">
                                {standing.gamesWon}-{standing.gamesLost}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )
              })}

              {groups.map(group => (
                <div key={group.id} className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{group.name} Results</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Player 1
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Score
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Player 2
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Score
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {Object.entries(results[group.id] || {}).map(([matchKey, match]) => (
                          <tr key={matchKey}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {match.player1.first_name} {match.player1.last_name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              <input
                                type="number"
                                min="0"
                                max="11"
                                value={match.score1}
                                onChange={(e) => updateResult(group.id, matchKey, 'score1', e.target.value)}
                                className="w-16 px-2 py-1 text-center border border-gray-300 rounded"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {match.player2.first_name} {match.player2.last_name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              <input
                                type="number"
                                min="0"
                                max="11"
                                value={match.score2}
                                onChange={(e) => updateResult(group.id, matchKey, 'score2', e.target.value)}
                                className="w-16 px-2 py-1 text-center border border-gray-300 rounded"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App