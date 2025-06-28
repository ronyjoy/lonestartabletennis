import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';
import { 
  ChartBarIcon, 
  StarIcon, 
  UserIcon, 
  AcademicCapIcon, 
  ClockIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  PlusIcon,
  TrashIcon,
  EyeIcon
} from './icons';

const SkillsEnhanced = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedSkillHistory, setSelectedSkillHistory] = useState(null);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const [newRating, setNewRating] = useState({
    skillName: '',
    rating: 5,
    notes: '',
    studentId: ''
  });

  const commonSkills = [
    'Forehand Drive', 'Backhand Drive', 'Forehand Loop', 'Backhand Loop',
    'Serve', 'Return', 'Footwork', 'Defense', 'Spin Recognition', 'Mental Game',
    'Forehand Flick', 'Backhand Flick', 'Smash', 'Drop Shot', 'Blocking'
  ];

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
      
      if (parsedUser.role === 'coach' || parsedUser.role === 'admin') {
        fetchStudents();
      }
    }

    fetchSkills();
    fetchStats();
  }, [navigate]);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_ENDPOINTS.SKILLS}/students`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setStudents(data.students);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchSkills = async (studentId = null) => {
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams();
      if (studentId) params.append('studentId', studentId);
      if (showHistory) params.append('showHistory', 'true');
      
      const url = `${API_ENDPOINTS.SKILLS}?${params.toString()}`;
      
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setSkills(data.skills || []);
      }
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async (studentId = null) => {
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams();
      if (studentId) params.append('studentId', studentId);
      
      const url = `${API_ENDPOINTS.SKILLS}/stats?${params.toString()}`;
      
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchSkillHistory = async (skillId, studentId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${API_ENDPOINTS.SKILLS}?studentId=${studentId}&skillId=${skillId}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      if (response.ok) {
        const data = await response.json();
        setSelectedSkillHistory(data.skillHistory || []);
      }
    } catch (error) {
      console.error('Error fetching skill history:', error);
    }
  };

  const addRating = async (e) => {
    e.preventDefault();
    setMessage('');

    if ((user.role === 'coach' || user.role === 'admin') && !newRating.studentId) {
      setMessage('Please select a student');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(API_ENDPOINTS.SKILLS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newRating)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Skill rating added successfully!');
        setNewRating({ skillName: '', rating: 5, notes: '', studentId: '' });
        setShowAddForm(false);
        fetchSkills(selectedStudent);
        fetchStats(selectedStudent);
      } else {
        setMessage(data.error?.message || 'Failed to add rating');
      }
    } catch (error) {
      setMessage('Error connecting to server');
    }
  };

  const deleteRating = async (ratingId) => {
    if (!confirm('Are you sure you want to delete this rating?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_ENDPOINTS.SKILLS}/rating/${ratingId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        setMessage('Rating deleted successfully!');
        fetchSkills(selectedStudent);
        fetchStats(selectedStudent);
      }
    } catch (error) {
      setMessage('Error deleting rating');
    }
  };

  const handleStudentChange = (studentId) => {
    setSelectedStudent(studentId);
    fetchSkills(studentId);
    fetchStats(studentId);
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    const key = `${skill.student_first_name}_${skill.student_last_name}_${skill.skill_name}`;
    if (!acc[key]) {
      acc[key] = {
        skill_name: skill.skill_name,
        student_name: `${skill.student_first_name} ${skill.student_last_name}`,
        ratings: []
      };
    }
    if (skill.rating) {
      acc[key].ratings.push(skill);
    }
    return acc;
  }, {});

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
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <ChartBarIcon className="w-8 h-8 text-purple-600" />
                Enhanced Skills Tracking
              </h1>
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
          
          {message && (
            <div className={`mb-4 p-3 rounded ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message}
            </div>
          )}

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <ChartBarIcon className="w-8 h-8 text-blue-600" />
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500">Total Skills</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.total_skills || 0}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <StarIcon className="w-8 h-8 text-yellow-600" />
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500">Average Rating</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.avg_rating || '0.0'}</p>
                  </div>
                </div>
              </div>
            </div>

            {user.role !== 'student' && (
              <>
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <UserIcon className="w-8 h-8 text-green-600" />
                      <div className="ml-5">
                        <p className="text-sm font-medium text-gray-500">
                          {user.role === 'admin' ? 'Total Students' : 'Students Coached'}
                        </p>
                        <p className="text-2xl font-semibold text-gray-900">{stats.total_students || stats.coaches_count || 0}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <AcademicCapIcon className="w-8 h-8 text-purple-600" />
                      <div className="ml-5">
                        <p className="text-sm font-medium text-gray-500">Active Coaches</p>
                        <p className="text-2xl font-semibold text-gray-900">{stats.total_coaches || 0}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Controls */}
          {(user.role === 'coach' || user.role === 'admin') && (
            <>
              {/* Student Selection */}
              {students.length > 0 && (
                <div className="mb-6 bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 max-w-md">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Student
                      </label>
                      <select
                        value={selectedStudent}
                        onChange={(e) => handleStudentChange(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">View All Students</option>
                        {students.map(student => (
                          <option key={student.id} value={student.id}>
                            {student.first_name} {student.last_name} 
                            {student.skills_count > 0 && ` (${student.skills_count} skills, avg: ${student.avg_rating || '0.0'})`}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="flex gap-4">
                      <button
                        onClick={() => setShowHistory(!showHistory)}
                        className={`px-4 py-2 rounded font-medium ${
                          showHistory 
                            ? 'bg-purple-500 text-white' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {showHistory ? 'Current Only' : 'Show History'}
                      </button>
                      
                      <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center gap-2"
                      >
                        <PlusIcon className="w-4 h-4" />
                        {showAddForm ? 'Cancel' : 'Add Rating'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Add Rating Form */}
          {showAddForm && (user.role === 'coach' || user.role === 'admin') && (
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <h3 className="text-lg font-bold mb-4">Add New Skill Rating</h3>
              <form onSubmit={addRating} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(user.role === 'coach' || user.role === 'admin') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Student</label>
                    <select
                      value={newRating.studentId}
                      onChange={(e) => setNewRating({...newRating, studentId: e.target.value})}
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
                    value={newRating.skillName}
                    onChange={(e) => setNewRating({...newRating, skillName: e.target.value})}
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
                    Rating (1-10): {newRating.rating}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={newRating.rating}
                    onChange={(e) => setNewRating({...newRating, rating: parseInt(e.target.value)})}
                    className="mt-1 block w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>Beginner</span>
                    <span>Expert</span>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Notes (optional)</label>
                  <textarea
                    value={newRating.notes}
                    onChange={(e) => setNewRating({...newRating, notes: e.target.value})}
                    rows="3"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add observations, improvement areas, or coaching notes..."
                  />
                </div>
                
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center gap-2"
                  >
                    <PlusIcon className="w-4 h-4" />
                    Add Rating
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Skills List */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Skills Overview ({Object.keys(groupedSkills).length} skills)
              </h2>
            </div>
            
            {loading ? (
              <div className="p-6 text-center text-gray-600">Loading skills...</div>
            ) : Object.keys(groupedSkills).length === 0 ? (
              <div className="p-6 text-center text-gray-600">
                {user.role === 'student' 
                  ? "No skills assigned yet. Your coaches will add skills here!" 
                  : "No skills found. Add skills for students to get started!"}
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {Object.values(groupedSkills).map((skillGroup, index) => (
                  <div key={index} className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{skillGroup.skill_name}</h3>
                        {user.role !== 'student' && (
                          <p className="text-sm text-gray-600">{skillGroup.student_name}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">
                          {skillGroup.ratings.length} rating{skillGroup.ratings.length !== 1 ? 's' : ''}
                        </span>
                        {skillGroup.ratings.length > 1 && (
                          <button
                            onClick={() => fetchSkillHistory(skillGroup.ratings[0].skill_id, skillGroup.ratings[0].user_id)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <EyeIcon className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {/* Ratings from different coaches */}
                    <div className="space-y-3">
                      {skillGroup.ratings.map((rating) => (
                        <div key={rating.rating_id} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center">
                                <AcademicCapIcon className="w-4 h-4 text-green-600 mr-1" />
                                <span className="text-sm font-medium text-gray-700">
                                  {rating.coach_first_name} {rating.coach_last_name}
                                </span>
                              </div>
                              
                              <div className="flex items-center">
                                {[...Array(10)].map((_, i) => (
                                  <StarIcon
                                    key={i}
                                    className={`w-4 h-4 ${i < rating.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                    filled={i < rating.rating}
                                  />
                                ))}
                                <span className="ml-2 text-sm font-medium">{rating.rating}/10</span>
                              </div>
                              
                              <div className="flex items-center text-sm text-gray-500">
                                <ClockIcon className="w-4 h-4 mr-1" />
                                {new Date(rating.rating_created_at).toLocaleDateString()}
                              </div>
                            </div>
                            
                            {(user.role === 'coach' || user.role === 'admin') && (
                              <button
                                onClick={() => deleteRating(rating.rating_id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <TrashIcon className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                          
                          {rating.notes && (
                            <p className="mt-2 text-sm text-gray-600 italic">"{rating.notes}"</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Skill History Modal */}
          {selectedSkillHistory && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
              <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Skill Rating History</h3>
                    <button
                      onClick={() => setSelectedSkillHistory(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {selectedSkillHistory.map((entry, index) => (
                      <div key={entry.rating_id} className="border-l-4 border-blue-500 pl-4 mb-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{entry.coach_first_name} {entry.coach_last_name}</p>
                            <p className="text-sm text-gray-600">{new Date(entry.created_at).toLocaleString()}</p>
                          </div>
                          <div className="flex items-center">
                            <span className="text-lg font-bold mr-2">{entry.rating}/10</span>
                            {entry.rating_change && (
                              <span className={`text-sm ${entry.rating_change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {entry.rating_change > 0 ? '+' : ''}{entry.rating_change}
                              </span>
                            )}
                          </div>
                        </div>
                        {entry.notes && <p className="text-sm text-gray-700 mt-1">"{entry.notes}"</p>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default SkillsEnhanced;