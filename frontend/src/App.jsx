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
        <Route path="/leagues" element={<LeaguesPage />} />
        <Route path="/leagues/signup" element={<LeagueSignupPage />} />
        <Route path="/league-signup" element={<PublicLeagueSignup />} />
        <Route path="/run-league" element={<RunLeaguePage />} />
        <Route path="/user-management" element={<UserManagementPage />} />
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

  const cleanupData = async () => {
    if (!confirm('⚠️ WARNING: This will delete ALL data except admin users!\n\nThis includes:\n• All students and coaches\n• All leagues and signups\n• All skills and badges\n• All match results\n\nThis action CANNOT be undone!\n\nAre you absolutely sure?')) return

    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/admin/cleanup-data', {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Data cleanup completed successfully! Only admin users remain.')
      } else {
        setMessage(data.error?.message || 'Failed to cleanup data')
      }
    } catch (error) {
      setMessage('Error during data cleanup')
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
              
              {/* Run League - Admin only */}
              {user.role === 'admin' && (
                <button 
                  onClick={() => navigate('/run-league')}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-4 rounded-lg inline-flex items-center justify-center gap-2"
                >
                  <PlayIcon className="w-5 h-5" color="white" />
                  Run League
                </button>
              )}
              
              {/* User Management - Admin only */}
              {user.role === 'admin' && (
                <button 
                  onClick={() => navigate('/user-management')}
                  className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-4 px-4 rounded-lg inline-flex items-center justify-center gap-2"
                >
                  <UsersIcon className="w-5 h-5" color="white" />
                  User Management
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
                onClick={() => navigate('/run-league')}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
              >
                <PlayIcon className="w-4 h-4" />
                Run League
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

function UserManagementPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'student'
  })

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
      
      fetchUsers()
    }
  }, [navigate])

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/admin/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        const data = await response.json()
        setUsers(data.users)
      }
    } catch (error) {
      console.error('Error fetching users:', error)
      setMessage('Error fetching users')
    } finally {
      setLoading(false)
    }
  }

  const createUser = async (e) => {
    e.preventDefault()
    setMessage('')

    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/admin/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newUser)
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(`${newUser.role.charAt(0).toUpperCase() + newUser.role.slice(1)} created successfully!`)
        setNewUser({ firstName: '', lastName: '', email: '', password: '', role: 'student' })
        setShowCreateForm(false)
        fetchUsers()
      } else {
        setMessage(data.error?.message || 'Failed to create user')
      }
    } catch (error) {
      setMessage('Error creating user')
    }
  }

  const deleteUser = async (userId, userRole) => {
    const isCoach = userRole === 'coach'
    const actionText = isCoach ? 'archive' : 'delete'
    const warningText = isCoach 
      ? 'Are you sure you want to archive this coach? They will no longer be able to log in, but their ratings and comments will be preserved.'
      : 'Are you sure you want to delete this user? This action cannot be undone.'
    
    if (!confirm(warningText)) return

    try {
      const token = localStorage.getItem('token')
      const endpoint = isCoach 
        ? `/api/admin/users/${userId}/archive`
        : `/api/admin/users/${userId}`
      
      const response = await fetch(endpoint, {
        method: isCoach ? 'PUT' : 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        setMessage(`User ${actionText}d successfully`)
        fetchUsers()
      } else {
        setMessage(`Failed to ${actionText} user`)
      }
    } catch (error) {
      setMessage(`Error ${actionText}ing user`)
    }
  }

  const reactivateUser = async (userId) => {
    if (!confirm('Reactivate this archived user? They will be able to log in again.')) return

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/admin/users/${userId}/reactivate`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        setMessage('User reactivated successfully')
        fetchUsers()
      } else {
        setMessage('Failed to reactivate user')
      }
    } catch (error) {
      setMessage('Error reactivating user')
    }
  }

  const cleanupData = async () => {
    if (!confirm('⚠️ WARNING: This will delete ALL data except admin users!\n\nThis includes:\n• All students and coaches\n• All leagues and signups\n• All skills and badges\n• All match results\n\nThis action CANNOT be undone!\n\nAre you absolutely sure?')) return

    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/admin/cleanup-data', {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Data cleanup completed successfully! Only admin users remain.')
        fetchUsers()
      } else {
        setMessage(data.error?.message || 'Failed to cleanup data')
      }
    } catch (error) {
      setMessage('Error during data cleanup')
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
                <UsersIcon className="w-8 h-8 text-indigo-600" />
                User Management
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
            <div className={`mb-6 p-4 rounded-lg ${
              message.includes('successfully') || message.includes('completed')
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-red-100 text-red-700 border border-red-200'
            }`}>
              <div className="flex items-center">
                <span className="mr-2">{message.includes('successfully') || message.includes('completed') ? '✅' : '❌'}</span>
                {message}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">System Management</h2>
            <div className="space-x-4">
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
              >
                <UserIcon className="w-4 h-4" />
                {showCreateForm ? 'Cancel' : 'Create User'}
              </button>
              <button
                onClick={cleanupData}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
              >
                🗑️ Clean All Data
              </button>
            </div>
          </div>

          {/* Create User Form */}
          {showCreateForm && (
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <h3 className="text-lg font-bold mb-4">Create New User</h3>
              <form onSubmit={createUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    value={newUser.firstName}
                    onChange={(e) => setNewUser({...newUser, firstName: e.target.value})}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    value={newUser.lastName}
                    onChange={(e) => setNewUser({...newUser, lastName: e.target.value})}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="student">Student</option>
                    <option value="coach">Coach</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                    required
                    minLength="6"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Minimum 6 characters"
                  />
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Create {newUser.role.charAt(0).toUpperCase() + newUser.role.slice(1)}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Users List */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">All Users ({users.length})</h3>
            </div>
            
            {loading ? (
              <div className="p-6 text-center text-gray-600">Loading users...</div>
            ) : users.length === 0 ? (
              <div className="p-6 text-center text-gray-600">
                No users found.
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {users.map((userItem) => (
                  <div key={userItem.id} className={`p-6 flex items-center justify-between ${
                    userItem.is_active === false ? 'bg-gray-50 opacity-75' : ''
                  }`}>
                    <div className="flex items-center space-x-4">
                      {getRoleIcon(userItem.role)}
                      <div>
                        <div className={`text-sm font-medium ${
                          userItem.is_active === false ? 'text-gray-500' : 'text-gray-900'
                        }`}>
                          {userItem.firstName} {userItem.lastName}
                          {userItem.is_active === false && (
                            <span className="ml-2 text-xs text-red-600 font-medium">(Archived)</span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">{userItem.email}</div>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        userItem.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                        userItem.role === 'coach' ? 'bg-green-100 text-green-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {userItem.role}
                      </span>
                      {userItem.is_active === false && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Archived
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className="text-xs text-gray-500">
                        ID: #{userItem.id}
                      </span>
                      {userItem.role !== 'admin' && (
                        <>
                          {userItem.is_active === false ? (
                            <button
                              onClick={() => reactivateUser(userItem.id)}
                              className="text-green-600 hover:text-green-800 text-sm font-medium"
                            >
                              Reactivate
                            </button>
                          ) : (
                            <button
                              onClick={() => deleteUser(userItem.id, userItem.role)}
                              className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                              {userItem.role === 'coach' ? 'Archive' : 'Delete'}
                            </button>
                          )}
                        </>
                      )}
                    </div>
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

function RunLeaguePage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [leagues, setLeagues] = useState([])
  const [selectedLeague, setSelectedLeague] = useState(null)
  const [signups, setSignups] = useState([])
  const [groups, setGroups] = useState([])
  const [groupingMethod, setGroupingMethod] = useState('middle') // 'middle' or 'snake'
  const [numberOfGroups, setNumberOfGroups] = useState('auto') // 'auto', '1', '2', '3'
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState({})
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [showElimination, setShowElimination] = useState(false)
  const [eliminationMatches, setEliminationMatches] = useState({})
  const [eliminationResults, setEliminationResults] = useState({})
  const [editingPlayer, setEditingPlayer] = useState(null)
  const [newRating, setNewRating] = useState('')

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
        // Show all active leagues, don't filter by participants yet since we need to check signups
        setLeagues(data.filter(league => league.is_active !== false))
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
        
        // Check if there's an existing league event for today
        await loadExistingLeagueEvent(leagueId)
      }
    } catch (error) {
      console.error('Error fetching signups:', error)
      setMessage('Error fetching signups')
    }
  }

  const loadExistingLeagueEvent = async (leagueId) => {
    try {
      const token = localStorage.getItem('token')
      const eventDate = new Date().toISOString().split('T')[0]
      
      const response = await fetch(`/api/league-events/by-date?league_instance_id=${selectedLeague.instance_id}&event_date=${eventDate}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      if (response.ok) {
        const existingEvent = await response.json()
        if (existingEvent && existingEvent.matches) {
          // Load existing results
          setResults(existingEvent.matches)
          setShowResults(true)
          setMessage(`Loaded existing league event for ${new Date().toLocaleDateString()}`)
          
          // Load elimination results if they exist
          if (existingEvent.elimination_results) {
            setEliminationResults(existingEvent.elimination_results)
            if (existingEvent.elimination_matches) {
              setEliminationMatches(existingEvent.elimination_matches)
              setShowElimination(true)
            }
          }
        }
      }
    } catch (error) {
      console.error('Error loading existing league event:', error)
      // Don't show error message as this is optional
    }
  }

  const generateGroups = (players) => {
    if (players.length === 0) {
      setGroups([])
      return
    }

    // Sort players by skill level (descending)
    const sortedPlayers = [...players].sort((a, b) => b.skill_level - a.skill_level)
    
    // Determine number of groups
    let numGroups
    if (numberOfGroups === 'auto') {
      numGroups = players.length <= 8 ? 1 : Math.min(3, Math.ceil(players.length / 6))
    } else {
      numGroups = parseInt(numberOfGroups)
    }
    
    // Ensure we don't have more groups than players
    numGroups = Math.min(numGroups, players.length)
    
    if (numGroups === 1) {
      setGroups([{ id: 1, name: 'Group 1', players: sortedPlayers }])
    } else {
      const groups = Array.from({ length: numGroups }, (_, i) => ({
        id: i + 1,
        name: `Group ${i + 1}`,
        players: []
      }))
      
      if (groupingMethod === 'middle') {
        // Split evenly by rating ranges
        const playersPerGroup = Math.ceil(sortedPlayers.length / numGroups)
        sortedPlayers.forEach((player, index) => {
          const groupIndex = Math.floor(index / playersPerGroup)
          if (groupIndex < numGroups) {
            groups[groupIndex].players.push(player)
          } else {
            // Add overflow to last group
            groups[numGroups - 1].players.push(player)
          }
        })
      } else {
        // Snake seeding - distribute evenly across groups
        sortedPlayers.forEach((player, index) => {
          const cycle = Math.floor(index / numGroups)
          const groupIndex = cycle % 2 === 0 
            ? index % numGroups 
            : numGroups - 1 - (index % numGroups)
          groups[groupIndex].players.push(player)
        })
      }
      
      setGroups(groups)
    }
  }

  const handleGroupingMethodChange = (method) => {
    setGroupingMethod(method)
    generateGroups(signups)
  }

  const handleGroupCountChange = (count) => {
    setNumberOfGroups(count)
    generateGroups(signups)
  }

  const removePlayer = async (playerId) => {
    if (!confirm('Remove this player from the league? This action cannot be undone.')) return

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/public/leagues/remove-player/${playerId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        const updatedSignups = signups.filter(player => player.id !== playerId)
        setSignups(updatedSignups)
        generateGroups(updatedSignups)
        setMessage('Player removed from league')
      } else {
        setMessage('Failed to remove player')
      }
    } catch (error) {
      console.error('Error removing player:', error)
      setMessage('Error removing player')
    }
  }

  const updatePlayerRating = async (playerId, newRating) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/public/leagues/update-player-rating`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          player_id: playerId,
          skill_level: parseInt(newRating)
        })
      })

      if (response.ok) {
        const updatedSignups = signups.map(player => 
          player.id === playerId 
            ? { ...player, skill_level: parseInt(newRating) }
            : player
        )
        setSignups(updatedSignups)
        generateGroups(updatedSignups)
        setEditingPlayer(null)
        setNewRating('')
        setMessage('Player rating updated successfully')
      } else {
        setMessage('Failed to update player rating')
      }
    } catch (error) {
      console.error('Error updating player rating:', error)
      setMessage('Error updating player rating')
    }
  }

  const startEditingPlayer = (player) => {
    setEditingPlayer(player)
    setNewRating(player.skill_level.toString())
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  const generateMatchResults = async () => {
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
    
    // Create or update league event in database (using date as unique identifier)
    try {
      const token = localStorage.getItem('token')
      const eventDate = new Date().toISOString().split('T')[0] // Today's date
      
      await fetch('/api/league-events/create-or-update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          league_instance_id: selectedLeague.instance_id,
          event_date: eventDate,
          event_name: `${selectedLeague.name} - ${new Date().toLocaleDateString()}`,
          grouping_method: groupingMethod,
          groups: groups,
          matches: newResults
        })
      })
      
      setMessage('League event initialized. Results will auto-save as you enter scores.')
    } catch (error) {
      console.error('Error creating/updating league event:', error)
      setMessage('Event created locally, but database save failed')
    }
  }

  const updateResult = async (groupId, matchKey, field, value) => {
    // Update local state
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
    
    // Auto-save to database using date-based identifier
    try {
      const token = localStorage.getItem('token')
      const eventDate = new Date().toISOString().split('T')[0]
      
      await fetch('/api/league-events/auto-save-by-date', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          league_instance_id: selectedLeague.instance_id,
          event_date: eventDate,
          results: {
            ...results,
            [groupId]: {
              ...results[groupId],
              [matchKey]: {
                ...results[groupId][matchKey],
                [field]: value
              }
            }
          }
        })
      })
    } catch (error) {
      console.error('Auto-save failed:', error)
      // Could show a subtle notification here, but don't interrupt user flow
    }
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

  const generateEliminationTournament = () => {
    if (groups.length < 2) {
      setMessage('Elimination tournament requires at least 2 groups')
      return
    }

    // Get top 2 players from each group
    const advancingPlayers = []
    
    groups.forEach(group => {
      const standings = calculateStandings(group.id)
      const hasCompletedMatches = standings.some(s => s.wins > 0 || s.losses > 0)
      
      if (!hasCompletedMatches) {
        setMessage('Complete some matches in the group stage first')
        return
      }
      
      // Add top 2 players
      if (standings.length >= 2) {
        advancingPlayers.push({
          ...standings[0].player,
          groupName: group.name,
          position: 1,
          groupId: group.id
        })
        advancingPlayers.push({
          ...standings[1].player,
          groupName: group.name,
          position: 2,
          groupId: group.id
        })
      }
    })

    if (advancingPlayers.length < 2) {
      setMessage('Not enough advancing players for elimination tournament')
      return
    }

    // Generate cross-over matches (Group 1 winner vs Group 2 runner-up, etc.)
    const matches = {}
    const results = {}
    
    if (advancingPlayers.length === 4) {
      // Two groups: 1st from Group 1 vs 2nd from Group 2, 1st from Group 2 vs 2nd from Group 1
      const group1Players = advancingPlayers.filter(p => p.groupId === groups[0].id)
      const group2Players = advancingPlayers.filter(p => p.groupId === groups[1].id)
      
      if (group1Players.length >= 2 && group2Players.length >= 2) {
        const match1Key = `${group1Players[0].id}-${group2Players[1].id}`
        const match2Key = `${group2Players[0].id}-${group1Players[1].id}`
        
        matches.semifinals = {
          [match1Key]: {
            player1: group1Players[0],
            player2: group2Players[1],
            score1: '',
            score2: '',
            round: 'Semifinal 1'
          },
          [match2Key]: {
            player1: group2Players[0],
            player2: group1Players[1],
            score1: '',
            score2: '',
            round: 'Semifinal 2'
          }
        }
        
        results.semifinals = {
          [match1Key]: { player1: group1Players[0], player2: group2Players[1], score1: '', score2: '' },
          [match2Key]: { player1: group2Players[0], player2: group1Players[1], score1: '', score2: '' }
        }

        // Create placeholder for finals (will be populated when semifinals are completed)
        matches.finals = {}
        results.finals = {}
      }
    } else if (advancingPlayers.length === 6) {
      // Three groups: need to handle bye system
      const sortedByPerformance = advancingPlayers.sort((a, b) => {
        // Sort by position (1st place players first), then by some performance metric
        if (a.position !== b.position) return a.position - b.position
        return 0 // Could add more sophisticated sorting here
      })
      
      // Give byes to the best performing players
      const playersWithByes = sortedByPerformance.slice(0, 2)
      const playersInFirstRound = sortedByPerformance.slice(2)
      
      if (playersInFirstRound.length >= 2) {
        // First elimination match
        const firstRoundKey = `${playersInFirstRound[0].id}-${playersInFirstRound[1].id}`
        matches.quarterfinals = {
          [firstRoundKey]: {
            player1: playersInFirstRound[0],
            player2: playersInFirstRound[1],
            score1: '',
            score2: '',
            round: 'Quarterfinal'
          }
        }
        
        results.quarterfinals = {
          [firstRoundKey]: { 
            player1: playersInFirstRound[0], 
            player2: playersInFirstRound[1], 
            score1: '', 
            score2: '' 
          }
        }

        // Create semifinals with bye players
        const semifinal1Key = `bye1-${firstRoundKey}`
        const semifinal2Key = `bye2-tbd`
        
        matches.semifinals = {
          [semifinal1Key]: {
            player1: playersWithByes[0],
            player2: null, // Will be filled by quarterfinal winner
            score1: '',
            score2: '',
            round: 'Semifinal 1',
            waitingFor: firstRoundKey
          },
          [semifinal2Key]: {
            player1: playersWithByes[1],
            player2: playersInFirstRound.length >= 4 ? playersInFirstRound[2] : null,
            score1: '',
            score2: '',
            round: 'Semifinal 2'
          }
        }

        results.semifinals = {
          [semifinal1Key]: { player1: playersWithByes[0], player2: null, score1: '', score2: '' },
          [semifinal2Key]: { player1: playersWithByes[1], player2: playersInFirstRound.length >= 4 ? playersInFirstRound[2] : null, score1: '', score2: '' }
        }

        // Create placeholder for finals
        matches.finals = {}
        results.finals = {}
      }
      
      setMessage(`Elimination tournament created! ${playersWithByes.map(p => `${p.first_name} ${p.last_name}`).join(' and ')} received byes to semifinals.`)
    }
    
    setEliminationMatches(matches)
    setEliminationResults(results)
    setShowElimination(true)
  }

  // Function to check and auto-generate finals when semifinals are completed
  const checkAndGenerateFinals = (currentResults = null) => {
    if (!eliminationMatches.semifinals) return

    const resultsToCheck = currentResults || eliminationResults
    const semifinalResults = resultsToCheck.semifinals || {}
    const semifinalMatches = Object.entries(semifinalResults)
    
    // Check if both semifinals are completed
    const completedSemifinals = semifinalMatches.filter(([_, match]) => 
      match.score1 !== '' && match.score2 !== ''
    )

    if (completedSemifinals.length === 2) {
      // Get winners from semifinals
      const winners = completedSemifinals.map(([matchKey, match]) => {
        const score1 = parseInt(match.score1) || 0
        const score2 = parseInt(match.score2) || 0
        return score1 > score2 ? match.player1 : match.player2
      })

      if (winners.length === 2 && winners[0] && winners[1]) {
        const finalsKey = `${winners[0].id}-${winners[1].id}`
        
        // Check if finals already exist
        if (!eliminationMatches.finals || Object.keys(eliminationMatches.finals).length === 0) {
          const newMatches = {
            ...eliminationMatches,
            finals: {
              [finalsKey]: {
                player1: winners[0],
                player2: winners[1],
                score1: '',
                score2: '',
                round: 'Finals'
              }
            }
          }

          const newResults = {
            ...resultsToCheck,
            finals: {
              [finalsKey]: {
                player1: winners[0],
                player2: winners[1],
                score1: '',
                score2: ''
              }
            }
          }

          setEliminationMatches(newMatches)
          setEliminationResults(newResults)
          setMessage('Finals match created! Winners from both semifinals will compete for the championship.')
        }
      }
    }
  }

  const updateEliminationResult = async (round, matchKey, field, value) => {
    const newResults = {
      ...eliminationResults,
      [round]: {
        ...eliminationResults[round],
        [matchKey]: {
          ...eliminationResults[round][matchKey],
          [field]: value
        }
      }
    }
    
    setEliminationResults(newResults)
    
    // Check if we need to generate finals after this update
    if (round === 'semifinals') {
      // Use the updated results directly instead of relying on state
      checkAndGenerateFinals(newResults)
    }
    
    // Auto-save elimination results using date-based identifier
    try {
      const token = localStorage.getItem('token')
      const eventDate = new Date().toISOString().split('T')[0]
      
      await fetch('/api/league-events/auto-save-elimination-by-date', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          league_instance_id: selectedLeague.instance_id,
          event_date: eventDate,
          elimination_results: newResults,
          elimination_matches: eliminationMatches
        })
      })
    } catch (error) {
      console.error('Auto-save elimination failed:', error)
    }
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
                <PlayIcon className="w-8 h-8 text-green-600" />
                Run League
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
              <div className="text-center py-8">
                <p className="text-gray-600 mb-2">No active leagues found.</p>
                <p className="text-sm text-gray-500">
                  Create leagues in <button onClick={() => navigate('/leagues')} className="text-blue-600 hover:text-blue-800 underline">League Management</button> first.
                </p>
              </div>
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
                    <p className="text-sm text-gray-600">
                      {league.actual_participants || 0} signups
                    </p>
                    <p className="text-xs text-gray-500">
                      {league.league_date ? new Date(league.league_date).toLocaleDateString() : 'No date set'}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Player Management */}
          {selectedLeague && signups.length > 0 && !showResults && (
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Player Management</h2>
              <div className="space-y-3">
                {signups.map((player) => (
                  <div key={player.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="font-medium text-gray-900">
                        {player.first_name} {player.last_name}
                      </div>
                      <div className="text-sm text-gray-600">{player.email}</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {editingPlayer?.id === player.id ? (
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            min="0"
                            max="3000"
                            value={newRating}
                            onChange={(e) => setNewRating(e.target.value)}
                            className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                            placeholder="Rating"
                          />
                          <button
                            onClick={() => updatePlayerRating(player.id, newRating)}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingPlayer(null)}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {player.skill_level}
                          </span>
                          <button
                            onClick={() => startEditingPlayer(player)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Edit Rating
                          </button>
                          <button
                            onClick={() => removePlayer(player.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Grouping Options */}
          {selectedLeague && signups.length > 0 && !showResults && (
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Tournament Settings</h2>
              
              {/* Number of Groups */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Number of Groups</label>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => handleGroupCountChange('auto')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      numberOfGroups === 'auto'
                        ? 'bg-blue-500 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Auto
                  </button>
                  <button
                    onClick={() => handleGroupCountChange('1')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      numberOfGroups === '1'
                        ? 'bg-blue-500 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    1 Group
                  </button>
                  <button
                    onClick={() => handleGroupCountChange('2')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      numberOfGroups === '2'
                        ? 'bg-blue-500 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    2 Groups
                  </button>
                  <button
                    onClick={() => handleGroupCountChange('3')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      numberOfGroups === '3'
                        ? 'bg-blue-500 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    3 Groups
                  </button>
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  {numberOfGroups === 'auto' 
                    ? `Auto: ${signups.length <= 8 ? '1 group' : `${Math.min(3, Math.ceil(signups.length / 6))} groups`} (≤8 players = 1 group, >8 players = multiple groups)`
                    : `Fixed: ${numberOfGroups} group${numberOfGroups === '1' ? '' : 's'}`
                  }
                </div>
              </div>

              {/* Grouping Method */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Seeding Method</label>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => handleGroupingMethodChange('middle')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      groupingMethod === 'middle'
                        ? 'bg-blue-500 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Middle Split
                  </button>
                  <button
                    onClick={() => handleGroupingMethodChange('snake')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      groupingMethod === 'snake'
                        ? 'bg-blue-500 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Snake Seeding
                  </button>
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  {groupingMethod === 'middle' 
                    ? 'Higher rated players go to Group 1, lower rated players to subsequent groups'
                    : 'Balanced groups with even distribution of skill levels (1st→Group1, 2nd→Group2, 3rd→Group2, 4th→Group1...)'
                  }
                </div>
              </div>
            </div>
          )}

          {/* League Event Status */}
          {selectedLeague && (
            <div className="bg-white shadow rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {selectedLeague.name} - {new Date().toLocaleDateString()}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {showResults ? 'Event in progress - Results auto-save as you enter scores' : 'Ready to start league event'}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    showResults ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {showResults ? '🟢 Active' : '⏳ Pending'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Groups Display */}
          {groups.length > 0 && (
            <div className="space-y-8">
              {groups.map(group => {
                const standings = showResults ? calculateStandings(group.id) : []
                const hasResults = standings.some(s => s.wins > 0 || s.losses > 0)
                
                return (
                  <div key={group.id} className="bg-white shadow-lg rounded-xl overflow-hidden">
                    {/* Group Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-2xl font-bold">{group.name}</h3>
                          <p className="text-blue-100">{group.players.length} players • Round Robin Format</p>
                        </div>
                        {hasResults && standings.length > 0 && (
                          <div className="text-right">
                            <div className="text-lg font-bold">👑 Leader</div>
                            <div className="text-xl">{standings[0].player.first_name} {standings[0].player.last_name}</div>
                            <div className="text-sm text-blue-100">{standings[0].wins}W-{standings[0].losses}L ({standings[0].points} pts)</div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                      {/* Players List */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <UsersIcon className="w-5 h-5 mr-2 text-gray-600" />
                          Players
                        </h4>
                        <div className="space-y-2">
                          {group.players.map((player, index) => (
                            <div key={player.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                                  {index + 1}
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900">
                                    {player.first_name} {player.last_name}
                                  </div>
                                  <div className="text-xs text-gray-500">{player.email}</div>
                                </div>
                              </div>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {player.skill_level}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Standings */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <TrophyIcon className="w-5 h-5 mr-2 text-yellow-600" />
                          Current Standings
                        </h4>
                        {!hasResults ? (
                          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                            <TrophyIcon className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                            <p>No matches completed yet</p>
                            <p className="text-sm">Start entering results to see standings</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {standings.map((standing, index) => (
                              <div key={standing.player.id} className={`flex items-center justify-between p-3 rounded-lg ${
                                index === 0 ? 'bg-yellow-50 border border-yellow-200' : 
                                index === 1 ? 'bg-gray-50 border border-gray-200' : 'bg-white border border-gray-100'
                              }`}>
                                <div className="flex items-center space-x-3">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                                    index === 0 ? 'bg-yellow-100 text-yellow-700' :
                                    index === 1 ? 'bg-gray-200 text-gray-700' : 'bg-gray-100 text-gray-600'
                                  }`}>
                                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index + 1}
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-900">
                                      {standing.player.first_name} {standing.player.last_name}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {standing.wins}W-{standing.losses}L • {standing.gamesWon}-{standing.gamesLost} games
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="font-bold text-lg text-gray-900">{standing.points}</div>
                                  <div className="text-xs text-gray-500">points</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Match Results - Only show if results are being entered */}
                    {showResults && (
                      <div className="border-t border-gray-200 p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <PlayIcon className="w-5 h-5 mr-2 text-green-600" />
                          Match Results
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {Object.entries(results[group.id] || {}).map(([matchKey, match]) => {
                            const isCompleted = match.score1 !== '' && match.score2 !== ''
                            const score1 = parseInt(match.score1) || 0
                            const score2 = parseInt(match.score2) || 0
                            const player1Wins = isCompleted && score1 > score2
                            const player2Wins = isCompleted && score2 > score1
                            const isTie = isCompleted && score1 === score2
                            
                            return (
                              <div key={matchKey} className={`p-4 rounded-lg border-2 ${
                                isCompleted ? 'border-gray-300 bg-gray-50' : 'border-gray-200 bg-white'
                              }`}>
                                <div className="flex items-center justify-between">
                                  <div className={`flex-1 p-2 rounded-lg ${
                                    player1Wins ? 'bg-green-100 border-2 border-green-300' :
                                    player2Wins ? 'bg-red-100 border-2 border-red-300' :
                                    isTie ? 'bg-yellow-100 border-2 border-yellow-300' :
                                    'bg-white border-2 border-transparent'
                                  }`}>
                                    <div className={`text-sm font-medium flex items-center ${
                                      player1Wins ? 'text-green-800' :
                                      player2Wins ? 'text-red-800' :
                                      'text-gray-900'
                                    }`}>
                                      {match.player1.first_name} {match.player1.last_name}
                                      {player1Wins && <span className="ml-2 text-green-600">🏆</span>}
                                      {player2Wins && <span className="ml-2 text-red-500">❌</span>}
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2 mx-4">
                                    <input
                                      type="number"
                                      min="0"
                                      max="11"
                                      value={match.score1}
                                      onChange={(e) => updateResult(group.id, matchKey, 'score1', e.target.value)}
                                      className={`w-12 px-2 py-1 text-center border-2 rounded text-sm font-bold ${
                                        player1Wins ? 'border-green-400 bg-green-50 text-green-800' :
                                        player2Wins ? 'border-red-300 bg-red-50 text-red-700' :
                                        'border-gray-300 bg-white text-gray-900'
                                      }`}
                                    />
                                    <span className="text-gray-500 font-bold">-</span>
                                    <input
                                      type="number"
                                      min="0"
                                      max="11"
                                      value={match.score2}
                                      onChange={(e) => updateResult(group.id, matchKey, 'score2', e.target.value)}
                                      className={`w-12 px-2 py-1 text-center border-2 rounded text-sm font-bold ${
                                        player2Wins ? 'border-green-400 bg-green-50 text-green-800' :
                                        player1Wins ? 'border-red-300 bg-red-50 text-red-700' :
                                        'border-gray-300 bg-white text-gray-900'
                                      }`}
                                    />
                                  </div>
                                  <div className={`flex-1 text-right p-2 rounded-lg ${
                                    player2Wins ? 'bg-green-100 border-2 border-green-300' :
                                    player1Wins ? 'bg-red-100 border-2 border-red-300' :
                                    isTie ? 'bg-yellow-100 border-2 border-yellow-300' :
                                    'bg-white border-2 border-transparent'
                                  }`}>
                                    <div className={`text-sm font-medium flex items-center justify-end ${
                                      player2Wins ? 'text-green-800' :
                                      player1Wins ? 'text-red-800' :
                                      'text-gray-900'
                                    }`}>
                                      {player1Wins && <span className="mr-2 text-red-500">❌</span>}
                                      {player2Wins && <span className="mr-2 text-green-600">🏆</span>}
                                      {match.player2.first_name} {match.player2.last_name}
                                    </div>
                                  </div>
                                </div>
                                {isCompleted && (
                                  <div className="mt-3 text-center">
                                    {isTie ? (
                                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                        🤝 Tie Game
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        ✓ {player1Wins ? match.player1.first_name : match.player2.first_name} Wins
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4">
                {!showResults ? (
                  <button
                    onClick={generateMatchResults}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
                  >
                    <PlayIcon className="w-5 h-5" />
                    <span>Start League Event</span>
                  </button>
                ) : (
                  <>
                    {groups.length > 1 && (
                      <button
                        onClick={generateEliminationTournament}
                        className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
                      >
                        <TrophyIcon className="w-5 h-5" />
                        <span>Create Elimination Bracket</span>
                      </button>
                    )}
                    <button
                      onClick={printResults}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
                    >
                      <span>🖨️</span>
                      <span>Print Results</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          )}


          {/* Elimination Tournament Section */}
          {showElimination && (
            <div className="mt-8">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold">🏆 Elimination Tournament</h2>
                    <p className="text-purple-100 mt-1">Cross-over format • Top 2 from each group advance</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">Championship Bracket</div>
                    <div className="text-sm text-purple-100">Single elimination</div>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-lg rounded-b-xl p-8">
                {/* Tournament Bracket */}
                <div className="space-y-8">
                  {Object.entries(eliminationMatches).map(([round, roundMatches]) => (
                    <div key={round} className="relative">
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {round === 'semifinals' ? '🥇 Semifinals' : 
                           round === 'quarterfinals' ? '🥊 Quarterfinals' : 
                           round === 'finals' ? '👑 Finals' : round.toUpperCase()}
                        </h3>
                        <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
                      </div>

                      <div className={`grid gap-8 ${
                        Object.keys(roundMatches).length === 1 ? 'grid-cols-1 max-w-md mx-auto' : 
                        Object.keys(roundMatches).length === 2 ? 'grid-cols-1 md:grid-cols-2' : 
                        'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                      }`}>
                        {Object.entries(roundMatches).map(([matchKey, match], matchIndex) => {
                          const result = eliminationResults[round]?.[matchKey] || match
                          const isCompleted = result.score1 !== '' && result.score2 !== ''
                          const winner = isCompleted ? 
                            (parseInt(result.score1) > parseInt(result.score2) ? result.player1 : result.player2) : null

                          return (
                            <div key={matchKey} className={`relative bg-gradient-to-br from-gray-50 to-white border-2 rounded-xl p-6 shadow-lg ${
                              isCompleted ? 'border-green-300' : 'border-gray-200'
                            }`}>
                              {/* Match Number */}
                              <div className="absolute -top-3 left-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                Match {matchIndex + 1}
                              </div>

                              {/* Player 1 */}
                              <div className={`mb-4 p-4 rounded-lg border-2 transition-all ${
                                winner?.id === match.player1.id ? 'border-green-400 bg-green-100' : 
                                isCompleted && winner?.id !== match.player1.id ? 'border-red-400 bg-red-100' :
                                'border-gray-200 bg-white'
                              }`}>
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <div className={`font-bold flex items-center ${
                                      winner?.id === match.player1.id ? 'text-green-800' :
                                      isCompleted && winner?.id !== match.player1.id ? 'text-red-800' :
                                      'text-gray-900'
                                    }`}>
                                      {match.player1.first_name} {match.player1.last_name}
                                      {winner?.id === match.player1.id && <span className="ml-2 text-green-600">🏆</span>}
                                      {isCompleted && winner?.id !== match.player1.id && <span className="ml-2 text-red-500">❌</span>}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                      {match.player1.groupName} • {match.player1.position === 1 ? '1st' : '2nd'} place
                                    </div>
                                  </div>
                                  <div className="ml-4">
                                    <input
                                      type="number"
                                      min="0"
                                      max="11"
                                      value={result.score1}
                                      onChange={(e) => updateEliminationResult(round, matchKey, 'score1', e.target.value)}
                                      className={`w-14 h-14 text-center text-xl font-bold border-2 rounded-lg focus:outline-none ${
                                        winner?.id === match.player1.id ? 'border-green-500 bg-green-50 text-green-800 focus:border-green-600' :
                                        isCompleted && winner?.id !== match.player1.id ? 'border-red-400 bg-red-50 text-red-700 focus:border-red-500' :
                                        'border-gray-300 bg-white text-gray-900 focus:border-purple-500'
                                      }`}
                                      placeholder="0"
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* VS Divider */}
                              <div className="text-center my-2">
                                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                                  isCompleted ? 'bg-gray-300 text-gray-700' : 'bg-gray-200 text-gray-600'
                                }`}>VS</span>
                              </div>

                              {/* Player 2 */}
                              <div className={`mb-4 p-4 rounded-lg border-2 transition-all ${
                                winner?.id === match.player2.id ? 'border-green-400 bg-green-100' :
                                isCompleted && winner?.id !== match.player2.id ? 'border-red-400 bg-red-100' :
                                'border-gray-200 bg-white'
                              }`}>
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <div className={`font-bold flex items-center ${
                                      winner?.id === match.player2.id ? 'text-green-800' :
                                      isCompleted && winner?.id !== match.player2.id ? 'text-red-800' :
                                      'text-gray-900'
                                    }`}>
                                      {match.player2.first_name} {match.player2.last_name}
                                      {winner?.id === match.player2.id && <span className="ml-2 text-green-600">🏆</span>}
                                      {isCompleted && winner?.id !== match.player2.id && <span className="ml-2 text-red-500">❌</span>}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                      {match.player2.groupName} • {match.player2.position === 1 ? '1st' : '2nd'} place
                                    </div>
                                  </div>
                                  <div className="ml-4">
                                    <input
                                      type="number"
                                      min="0"
                                      max="11"
                                      value={result.score2}
                                      onChange={(e) => updateEliminationResult(round, matchKey, 'score2', e.target.value)}
                                      className={`w-14 h-14 text-center text-xl font-bold border-2 rounded-lg focus:outline-none ${
                                        winner?.id === match.player2.id ? 'border-green-500 bg-green-50 text-green-800 focus:border-green-600' :
                                        isCompleted && winner?.id !== match.player2.id ? 'border-red-400 bg-red-50 text-red-700 focus:border-red-500' :
                                        'border-gray-300 bg-white text-gray-900 focus:border-purple-500'
                                      }`}
                                      placeholder="0"
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Match Status */}
                              <div className="text-center">
                                {isCompleted ? (
                                  <div className="space-y-2">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                      ✓ Match Complete
                                    </span>
                                    {winner && (
                                      <div className="text-sm font-bold text-gray-900">
                                        🏆 {winner.first_name} {winner.last_name} advances
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                                    ⏳ Pending Result
                                  </span>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>

                      {/* Connecting Lines (for visual appeal) */}
                      {round === 'quarterfinals' && Object.keys(eliminationMatches).includes('semifinals') && (
                        <div className="flex justify-center mt-8">
                          <div className="w-1 h-8 bg-gradient-to-b from-purple-300 to-transparent"></div>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Championship Banner */}
                  {Object.keys(eliminationMatches).length > 0 && (() => {
                    // Check if finals are completed
                    const finalsResults = eliminationResults.finals || {}
                    const finalsMatch = Object.values(finalsResults)[0]
                    const isFinalsCompleted = finalsMatch && finalsMatch.score1 !== '' && finalsMatch.score2 !== ''
                    
                    if (isFinalsCompleted) {
                      const score1 = parseInt(finalsMatch.score1) || 0
                      const score2 = parseInt(finalsMatch.score2) || 0
                      const champion = score1 > score2 ? finalsMatch.player1 : finalsMatch.player2
                      const runnerUp = score1 > score2 ? finalsMatch.player2 : finalsMatch.player1
                      
                      return (
                        <div className="mt-8 text-center p-8 bg-gradient-to-r from-yellow-200 to-yellow-300 rounded-xl border-4 border-yellow-400 shadow-lg">
                          <div className="text-4xl font-bold text-yellow-900 mb-4">
                            🏆 TOURNAMENT CHAMPION 🏆
                          </div>
                          <div className="text-3xl font-bold text-yellow-800 mb-2">
                            {champion.first_name} {champion.last_name}
                          </div>
                          <div className="text-lg text-yellow-700 mb-4">
                            Defeated {runnerUp.first_name} {runnerUp.last_name} ({score1}-{score2})
                          </div>
                          <div className="text-yellow-600">
                            🥇 Congratulations on winning the tournament! 🥇
                          </div>
                        </div>
                      )
                    } else {
                      return (
                        <div className="mt-8 text-center p-6 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-xl border-2 border-yellow-300">
                          <div className="text-2xl font-bold text-yellow-800 mb-2">🏆 Tournament Champion</div>
                          <div className="text-yellow-700">
                            {Object.keys(eliminationMatches.finals || {}).length > 0 
                              ? 'Finals match in progress...' 
                              : 'Winner advances to claim the championship title!'}
                          </div>
                        </div>
                      )
                    }
                  })()}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App