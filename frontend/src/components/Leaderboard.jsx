import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';
import { 
  TrophyIcon,
  StarIcon,
  UserIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  ChartBarIcon,
  TargetIcon
} from './icons';

const Leaderboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  
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
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token) {
      navigate('/login');
      return;
    }
    
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      fetchLeaderboard();
    }
  }, [navigate]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_ENDPOINTS.SKILLS}/leaderboard`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setLeaderboard(data.leaderboard || []);
      } else {
        const errorData = await response.json();
        setMessage(errorData.error?.message || 'Failed to load leaderboard');
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setMessage('Error loading leaderboard');
    } finally {
      setLoading(false);
    }
  };

  const getLevel = (avgRating) => {
    if (avgRating >= 8) return { name: 'Advanced', color: 'text-purple-600 bg-purple-100' };
    if (avgRating >= 6) return { name: 'Intermediate', color: 'text-blue-600 bg-blue-100' };
    if (avgRating >= 4) return { name: 'Beginner', color: 'text-green-600 bg-green-100' };
    return { name: 'Starting', color: 'text-gray-600 bg-gray-100' };
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

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
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <TrophyIcon className="w-8 h-8 text-yellow-600" />
                Student Leaderboard
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
          {message && (
            <div className="mb-4 p-3 rounded bg-red-100 text-red-700">
              {message}
            </div>
          )}

          {/* Leaderboard Info */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Table Tennis Academy Leaderboard</h2>
              <p className="text-gray-600">
                Students ranked by their average skill rating across all evaluated skills
              </p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="text-gray-600">Loading leaderboard...</div>
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="text-center py-12">
              <TrophyIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No students with skill ratings yet.</p>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Rankings ({leaderboard.length} Students)
                </h3>
              </div>
              
              <div className="divide-y divide-gray-200">
                {leaderboard.map((student, index) => {
                  const rank = index + 1;
                  const level = getLevel(parseFloat(student.avg_rating));
                  const isCurrentUser = user.role === 'student' && student.id === user.id;
                  
                  return (
                    <div 
                      key={student.id} 
                      className={`p-6 hover:bg-gray-50 transition-colors ${
                        isCurrentUser ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {/* Rank */}
                          <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                            {rank <= 3 ? (
                              <span className="text-2xl">{getRankIcon(rank)}</span>
                            ) : (
                              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                <span className="text-sm font-bold text-gray-600">{rank}</span>
                              </div>
                            )}
                          </div>

                          {/* Student Info */}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center space-x-2">
                              <UserIcon className="w-5 h-5 text-gray-400" />
                              <p className="text-lg font-medium text-gray-900">
                                {student.first_name} {student.last_name}
                                {isCurrentUser && (
                                  <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                    You
                                  </span>
                                )}
                              </p>
                            </div>
                            <p className="text-sm text-gray-500">{student.email}</p>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center space-x-6">
                          {/* Skills Evaluated */}
                          <div className="text-center">
                            <div className="flex items-center justify-center mb-1">
                              <ChartBarIcon className="w-5 h-5 text-gray-400 mr-1" />
                              <span className="text-lg font-bold text-gray-900">
                                {student.skills_count}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500">Skills</p>
                          </div>

                          {/* Average Rating */}
                          <div className="text-center">
                            <div className="flex items-center justify-center mb-1">
                              <div className="flex items-center">
                                <StarIcon className="w-5 h-5 text-yellow-400 mr-1" filled={true} />
                                <span className="text-lg font-bold text-gray-900">
                                  {parseFloat(student.avg_rating).toFixed(1)}
                                </span>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500">Average</p>
                          </div>

                          {/* Level */}
                          <div className="text-center">
                            <div className="flex items-center justify-center mb-1">
                              <TargetIcon className="w-5 h-5 text-gray-400 mr-1" />
                              <span 
                                className={`text-sm font-bold px-2 py-1 rounded ${level.color}`}
                              >
                                {level.name}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500">Level</p>
                          </div>
                        </div>
                      </div>

                      {/* Rating Visualization */}
                      <div className="mt-3 ml-16">
                        <div className="flex items-center">
                          <span className="text-xs text-gray-500 mr-2">Rating:</span>
                          <div className="flex items-center">
                            {[...Array(10)].map((_, i) => (
                              <StarIcon
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(parseFloat(student.avg_rating)) 
                                    ? 'text-yellow-400' 
                                    : 'text-gray-300'
                                }`}
                                filled={i < Math.floor(parseFloat(student.avg_rating))}
                              />
                            ))}
                            <span className="ml-2 text-xs text-gray-600">
                              {parseFloat(student.avg_rating).toFixed(1)}/10
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;