import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PublicLeagueSignup = () => {
  const [leagues, setLeagues] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    skillLevel: 5,
    emergencyContact: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchActiveLeagues();
  }, []);

  const fetchActiveLeagues = async () => {
    try {
      const response = await axios.get('/api/public/leagues');
      setLeagues(response.data);
    } catch (error) {
      console.error('Error fetching leagues:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await axios.post(`/api/public/leagues/${selectedLeague.id}/register`, formData);
      setMessage('Registration successful! We will contact you soon.');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        skillLevel: 5,
        emergencyContact: ''
      });
      setSelectedLeague(null);
      fetchActiveLeagues(); // Refresh to show updated participant count
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getDayName = (dayNumber) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayNumber];
  };

  const formatLeagueDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getDaysUntilText = (daysUntil) => {
    if (daysUntil === 0) return "Today!";
    if (daysUntil === 1) return "Tomorrow";
    return `In ${daysUntil} days`;
  };

  if (selectedLeague) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
          <button 
            onClick={() => setSelectedLeague(null)}
            className="text-blue-500 hover:text-blue-700 mb-4"
          >
            ← Back to Leagues
          </button>
          
          <h2 className="text-2xl font-bold mb-4">{selectedLeague.name}</h2>
          <div className="mb-6 p-4 bg-gray-100 rounded">
            <p><strong>Schedule:</strong> {getDayName(selectedLeague.day_of_week)} {selectedLeague.start_time} - {selectedLeague.end_time}</p>
            <p><strong>Skill Level:</strong> {selectedLeague.skill_level_min}-{selectedLeague.skill_level_max}</p>
            <p><strong>Spots Available:</strong> {selectedLeague.max_participants - selectedLeague.actual_participants}</p>
            {selectedLeague.entry_fee > 0 && <p><strong>Entry Fee:</strong> ${selectedLeague.entry_fee}</p>}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                required
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                required
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <input
              type="tel"
              placeholder="Phone (optional)"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skill Level (1=Beginner, 10=Expert)
              </label>
              <select
                value={formData.skillLevel}
                onChange={(e) => setFormData({...formData, skillLevel: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {[1,2,3,4,5,6,7,8,9,10].map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            
            <input
              type="text"
              placeholder="Emergency Contact (optional)"
              value={formData.emergencyContact}
              onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
            >
              {loading ? 'Registering...' : 'Register for League'}
            </button>
          </form>
          
          {message && (
            <p className={`mt-4 text-center ${message.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🏓 This Week's Leagues
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Sign up for leagues happening this week
          </p>
          <p className="text-sm text-gray-500">
            Week of {new Date().toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric',
              year: 'numeric',
              weekday: 'long'
            })}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leagues.map(league => (
            <div key={league.id} className="bg-white rounded-lg shadow p-6 relative">
              {/* Urgency badge */}
              {league.days_until <= 1 && (
                <div className={`absolute top-4 right-4 px-2 py-1 rounded text-xs font-bold text-white ${
                  league.days_until === 0 ? 'bg-red-500' : 'bg-orange-500'
                }`}>
                  {getDaysUntilText(league.days_until)}
                </div>
              )}
              
              <h3 className="text-xl font-bold mb-3">{league.name}</h3>
              <p className="text-gray-600 mb-4">{league.description}</p>
              
              <div className="space-y-2 mb-4">
                <p><strong>📅 Date:</strong> {formatLeagueDate(league.league_date)}</p>
                <p><strong>🕐 Time:</strong> {league.start_time} - {league.end_time}</p>
                <p><strong>🎯 Skill Level:</strong> {league.skill_level_min}-{league.skill_level_max}</p>
                <p><strong>👥 Spots:</strong> {league.actual_participants}/{league.max_participants}</p>
                {league.entry_fee > 0 && <p><strong>💰 Fee:</strong> ${league.entry_fee}</p>}
                <p className="text-sm text-gray-500">
                  <strong>📍 Status:</strong> {getDaysUntilText(league.days_until)}
                </p>
              </div>
              
              {league.actual_participants >= league.max_participants ? (
                <button disabled className="w-full bg-gray-400 text-white font-bold py-2 px-4 rounded">
                  League Full
                </button>
              ) : (
                <button
                  onClick={() => setSelectedLeague(league)}
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Sign Up
                </button>
              )}
            </div>
          ))}
        </div>
        
        {leagues.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No leagues available for signup at this time.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicLeagueSignup;