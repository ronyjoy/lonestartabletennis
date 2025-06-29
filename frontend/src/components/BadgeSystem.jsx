import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../config/api';
import { 
  TrophyIcon, 
  StarIcon, 
  AcademicCapIcon,
  PlusIcon,
  TrashIcon 
} from './icons';

// Badge definitions with categories and colors
const AVAILABLE_BADGES = {
  'Skill Development': [
    { id: 'first-serve', name: 'First Serve', icon: '🏓', description: 'First successful serve', color: 'bg-blue-100 text-blue-800' },
    { id: 'spin-master', name: 'Spin Master', icon: '🎯', description: 'Mastered spin techniques', color: 'bg-purple-100 text-purple-800' },
    { id: 'defense-champion', name: 'Defense Champion', icon: '🛡️', description: 'Excellent defensive skills', color: 'bg-green-100 text-green-800' },
    { id: 'speed-demon', name: 'Speed Demon', icon: '⚡', description: 'Fast attack skills', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'trick-shot-artist', name: 'Trick Shot Artist', icon: '🎪', description: 'Creative shot techniques', color: 'bg-pink-100 text-pink-800' },
    { id: 'forehand-expert', name: 'Forehand Expert', icon: '🏅', description: 'Mastered forehand drive', color: 'bg-orange-100 text-orange-800' },
    { id: 'backhand-expert', name: 'Backhand Expert', icon: '🏅', description: 'Mastered backhand drive', color: 'bg-orange-100 text-orange-800' },
    { id: 'loop-legend', name: 'Loop Legend', icon: '🌀', description: 'Mastered loop shots', color: 'bg-indigo-100 text-indigo-800' }
  ],
  'Achievement': [
    { id: 'tournament-ready', name: 'Tournament Ready', icon: '🏆', description: 'Ready for competition', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'perfect-practice', name: 'Perfect Practice', icon: '💯', description: '100% attendance streak', color: 'bg-green-100 text-green-800' },
    { id: 'most-improved', name: 'Most Improved', icon: '📈', description: 'Biggest skill improvement', color: 'bg-blue-100 text-blue-800' },
    { id: 'consistency-champion', name: 'Consistency Champion', icon: '🎖️', description: 'Consistent performance', color: 'bg-purple-100 text-purple-800' },
    { id: 'all-star-player', name: 'All-Star Player', icon: '⭐', description: 'Excellence across all skills', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'league-champion', name: 'League Champion', icon: '🥇', description: 'Won a league', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'hot-streak', name: 'Hot Streak', icon: '🔥', description: 'Multiple wins in a row', color: 'bg-red-100 text-red-800' }
  ],
  'Character': [
    { id: 'great-teammate', name: 'Great Teammate', icon: '🤝', description: 'Excellent sportsmanship', color: 'bg-green-100 text-green-800' },
    { id: 'quick-learner', name: 'Quick Learner', icon: '🎓', description: 'Fast skill acquisition', color: 'bg-blue-100 text-blue-800' },
    { id: 'never-give-up', name: 'Never Give Up', icon: '💪', description: 'Perseverance', color: 'bg-red-100 text-red-800' },
    { id: 'coaches-choice', name: "Coach's Choice", icon: '🌟', description: 'Outstanding dedication', color: 'bg-purple-100 text-purple-800' },
    { id: 'goal-achiever', name: 'Goal Achiever', icon: '🎯', description: 'Met personal goals', color: 'bg-orange-100 text-orange-800' },
    { id: 'rule-master', name: 'Rule Master', icon: '📚', description: 'Knows all the rules', color: 'bg-indigo-100 text-indigo-800' }
  ]
};

const BadgeSystem = ({ studentId, currentUser, isManageView = false }) => {
  const [studentBadges, setStudentBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [showAssignBadge, setShowAssignBadge] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Skill Development');

  useEffect(() => {
    console.log('BadgeSystem component mounted with:', { studentId, currentUser });
    if (studentId) {
      console.log('About to fetch badges...');
      fetchStudentBadges();
    } else {
      console.log('No studentId provided, not fetching badges');
      setLoading(false);
    }
  }, [studentId]);

  const fetchStudentBadges = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      console.log('Fetching badges for studentId:', studentId);
      console.log('Current user:', currentUser);
      console.log('Token exists:', !!token);
      console.log('API URL:', `${API_ENDPOINTS.SKILLS}/badges/${studentId}`);
      
      const response = await fetch(`${API_ENDPOINTS.SKILLS}/badges/${studentId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      console.log('Badge response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Badge data received:', data);
        setStudentBadges(data.badges || []);
      } else {
        const errorData = await response.json();
        console.error('Failed to fetch badges:', response.status, errorData);
        setMessage('Failed to load badges');
      }
    } catch (error) {
      console.error('Error fetching student badges:', error);
      setMessage('Error loading badges');
    } finally {
      setLoading(false);
    }
  };

  const assignBadge = async (badgeId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_ENDPOINTS.SKILLS}/badges/${studentId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ badgeId })
      });

      if (response.ok) {
        setMessage('Badge assigned successfully!');
        fetchStudentBadges();
        setTimeout(() => setMessage(''), 3000);
      } else {
        const data = await response.json();
        setMessage(data.error?.message || 'Failed to assign badge');
      }
    } catch (error) {
      setMessage('Error assigning badge');
    }
  };

  const removeBadge = async (badgeId) => {
    if (!confirm('Are you sure you want to remove this badge?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_ENDPOINTS.SKILLS}/badges/${studentId}/${badgeId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        setMessage('Badge removed successfully!');
        fetchStudentBadges();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Failed to remove badge');
      }
    } catch (error) {
      setMessage('Error removing badge');
    }
  };

  const getBadgeInfo = (badgeId) => {
    for (const category of Object.values(AVAILABLE_BADGES)) {
      const badge = category.find(b => b.id === badgeId);
      if (badge) return badge;
    }
    return { id: badgeId, name: badgeId, icon: '🏅', description: '', color: 'bg-gray-100 text-gray-800' };
  };

  const getAvailableBadges = () => {
    const assignedBadgeIds = studentBadges.map(b => b.badge_id);
    return AVAILABLE_BADGES[selectedCategory].filter(badge => !assignedBadgeIds.includes(badge.id));
  };

  const canManageBadges = currentUser.role === 'coach' || currentUser.role === 'admin';

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center py-4">Loading badges...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <TrophyIcon className="w-6 h-6 text-yellow-600" />
          {isManageView ? 'Student Badges' : 'Your Badges'}
        </h3>
        {canManageBadges && isManageView && (
          <button
            onClick={() => setShowAssignBadge(!showAssignBadge)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center gap-2"
          >
            <PlusIcon className="w-4 h-4" />
            {showAssignBadge ? 'Cancel' : 'Assign Badge'}
          </button>
        )}
      </div>

      {message && (
        <div className={`mb-4 p-3 rounded ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}

      {/* Assign Badge Form - Coach/Admin only */}
      {showAssignBadge && canManageBadges && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-bold mb-3">Assign New Badge</h4>
          
          {/* Category Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Badge Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.keys(AVAILABLE_BADGES).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Available Badges */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {getAvailableBadges().map(badge => (
              <button
                key={badge.id}
                onClick={() => assignBadge(badge.id)}
                className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{badge.icon}</span>
                  <div>
                    <div className="font-medium">{badge.name}</div>
                    <div className="text-sm text-gray-600">{badge.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          {getAvailableBadges().length === 0 && (
            <div className="text-center py-4 text-gray-500">
              All badges in this category have been assigned!
            </div>
          )}
        </div>
      )}

      {/* Student Badges Display */}
      <div className="space-y-4">
        {studentBadges.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {isManageView 
              ? "No badges assigned yet. Assign badges to recognize this student's achievements!" 
              : "No badges earned yet. Keep practicing to earn your first badge!"}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {studentBadges.map((studentBadge) => {
              const badgeInfo = getBadgeInfo(studentBadge.badge_id);
              return (
                <div key={studentBadge.id} className={`p-4 rounded-lg border ${badgeInfo.color}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{badgeInfo.icon}</span>
                      <div>
                        <h4 className="font-bold">{badgeInfo.name}</h4>
                        <p className="text-sm opacity-80">{badgeInfo.description}</p>
                        <div className="text-xs mt-1 opacity-70">
                          Earned: {new Date(studentBadge.created_at).toLocaleDateString()}
                        </div>
                        {studentBadge.coach_first_name && (
                          <div className="text-xs opacity-70">
                            By: {studentBadge.coach_first_name} {studentBadge.coach_last_name}
                          </div>
                        )}
                      </div>
                    </div>
                    {canManageBadges && isManageView && (
                      <button
                        onClick={() => removeBadge(studentBadge.badge_id)}
                        className="text-red-600 hover:text-red-800"
                        title="Remove badge"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BadgeSystem;