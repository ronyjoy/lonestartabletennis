import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TableTennisIcon, CalendarIcon, ClockIcon, TargetIcon, UsersIcon, DollarIcon, MapPinIcon, EyeIcon, StarIcon } from './icons';

const PublicLeagueSignup = () => {
  const [leagues, setLeagues] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [expandedLeague, setExpandedLeague] = useState(null);
  const [leaguePlayers, setLeaguePlayers] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    skillLevel: 1000,
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

  const fetchLeaguePlayers = async (leagueId) => {
    try {
      const response = await axios.get(`/api/public/leagues/${leagueId}/players`);
      setLeaguePlayers(prev => ({
        ...prev,
        [leagueId]: response.data
      }));
    } catch (error) {
      console.error('Error fetching league players:', error);
    }
  };

  const toggleLeagueExpansion = (leagueId) => {
    if (expandedLeague === leagueId) {
      setExpandedLeague(null);
    } else {
      setExpandedLeague(leagueId);
      if (!leaguePlayers[leagueId]) {
        fetchLeaguePlayers(leagueId);
      }
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
        skillLevel: 1000,
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
            <p><strong>USATT Rating:</strong> {selectedLeague.skill_level_min}-{selectedLeague.skill_level_max}</p>
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
                USATT Rating (0-3000)
              </label>
              <input
                type="number"
                min="0"
                max="3000"
                step="1"
                value={formData.skillLevel}
                onChange={(e) => setFormData({...formData, skillLevel: parseInt(e.target.value) || 0})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your USATT rating (0-3000)"
              />
              <p className="text-xs text-gray-500 mt-1">
                Rating Guide: Beginner 0-1200, Intermediate 1200-1600, Advanced 1600+
              </p>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <TableTennisIcon className="w-10 h-10 text-blue-600" />
            This Week's Leagues
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Sign up for leagues happening this week
          </p>
          <p className="text-sm text-gray-500">
            {(() => {
              const today = new Date();
              const dayOfWeek = today.getDay(); // 0=Sunday, 1=Monday, etc.
              const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Calculate days to get to Monday
              const monday = new Date(today);
              monday.setDate(today.getDate() + daysToMonday);
              const sunday = new Date(monday);
              sunday.setDate(monday.getDate() + 6);
              
              return `Week of ${monday.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })} - ${sunday.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              })} (Monday - Sunday)`;
            })()}
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
                <p className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-blue-600" />
                  <strong>Date:</strong> {formatLeagueDate(league.league_date)}
                </p>
                <p className="flex items-center gap-2">
                  <ClockIcon className="w-4 h-4 text-green-600" />
                  <strong>Time:</strong> {league.start_time} - {league.end_time}
                </p>
                <p className="flex items-center gap-2">
                  <TargetIcon className="w-4 h-4 text-purple-600" />
                  <strong>USATT Rating:</strong> {league.skill_level_min}-{league.skill_level_max}
                </p>
                <p className="flex items-center gap-2">
                  <UsersIcon className="w-4 h-4 text-orange-600" />
                  <strong>Spots:</strong> {league.actual_participants}/{league.max_participants}
                </p>
                {league.entry_fee > 0 && (
                  <p className="flex items-center gap-2">
                    <DollarIcon className="w-4 h-4 text-green-600" />
                    <strong>Fee:</strong> ${league.entry_fee}
                  </p>
                )}
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4 text-gray-500" />
                  <strong>Status:</strong> {getDaysUntilText(league.days_until)}
                </p>
              </div>
              
              <div className="space-y-2">
                {/* View Players Button */}
                {league.actual_participants > 0 && (
                  <button
                    onClick={() => toggleLeagueExpansion(league.id)}
                    className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center gap-2"
                  >
                    <EyeIcon className="w-4 h-4" />
                    {expandedLeague === league.id ? 'Hide' : 'View'} Players ({league.actual_participants})
                  </button>
                )}
                
                {/* Sign Up Button */}
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
              
              {/* Expanded Players List */}
              {expandedLeague === league.id && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                  <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <UsersIcon className="w-4 h-4 text-gray-600" />
                    Registered Players
                  </h4>
                  {leaguePlayers[league.id] ? (
                    leaguePlayers[league.id].players.length > 0 ? (
                      <div className="space-y-2">
                        {leaguePlayers[league.id].players.map((player, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600">
                                {index + 1}
                              </div>
                              <span className="text-sm font-medium text-gray-900">{player.display_name}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <StarIcon className="w-4 h-4 text-yellow-500" />
                              <span className="text-xs text-gray-600">{player.skill_level}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 italic">No players registered yet.</p>
                    )
                  ) : (
                    <p className="text-sm text-gray-500">Loading players...</p>
                  )}
                </div>
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