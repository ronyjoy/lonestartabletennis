import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';
import SkillProgressChart from './SkillProgressChart';
import StudentComments from './StudentComments';
import { 
  ChartBarIcon, 
  StarIcon, 
  UserIcon, 
  AcademicCapIcon, 
  ClockIcon,
  PlusIcon,
  TrashIcon,
  EyeIcon
} from './icons';

const SkillsRedesigned = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentSkills, setStudentSkills] = useState([]);
  const [skillHistory, setSkillHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

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
      
      if (parsedUser.role === 'student') {
        // For students, fetch their own skills and history
        fetchStudentSkills(parsedUser.userId);
        fetchSkillHistory();
      } else {
        // For coaches/admins, fetch students list
        fetchStudents();
      }
    }
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
        if (data.students.length > 0) {
          // Auto-select first student
          setSelectedStudent(data.students[0]);
          fetchStudentSkills(data.students[0].id);
          fetchSkillHistory(data.students[0].id);
        }
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchStudentSkills = async (studentId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_ENDPOINTS.SKILLS}?studentId=${studentId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Student skills data:', data.skills); // Debug log
        setStudentSkills(data.skills || []);
      }
    } catch (error) {
      console.error('Error fetching student skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSkillHistory = async (studentId = null) => {
    try {
      const token = localStorage.getItem('token');
      const url = studentId 
        ? `${API_ENDPOINTS.SKILLS}/history?studentId=${studentId}`
        : `${API_ENDPOINTS.SKILLS}/history`;
      
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setSkillHistory(data.history || []);
      }
    } catch (error) {
      console.error('Error fetching skill history:', error);
    }
  };

  const addOrUpdateSkillRating = async (skillName, rating, notes = '') => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(API_ENDPOINTS.SKILLS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          skillName,
          rating,
          notes,
          studentId: selectedStudent.id
        })
      });

      if (response.ok) {
        setMessage(`${skillName} rating updated successfully!`);
        fetchStudentSkills(selectedStudent.id);
        fetchSkillHistory(selectedStudent.id);
        setTimeout(() => setMessage(''), 3000);
      } else {
        const data = await response.json();
        setMessage(data.error?.message || 'Failed to update skill rating');
      }
    } catch (error) {
      setMessage('Error updating skill rating');
    }
  };

  const getSkillRating = (skillName) => {
    const skill = studentSkills.find(s => s.skill_name === skillName);
    return skill ? skill.rating : 0;
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

  // Student view - show their own skills
  if (user.role === 'student') {
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
                  <ChartBarIcon className="w-8 h-8 text-blue-600" />
                  My Skills
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Welcome, {user.firstName}!</span>
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {loading ? (
              <div className="text-center py-8">Loading your skills...</div>
            ) : studentSkills.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No skills assigned yet. Your coaches will add skills here!</p>
              </div>
            ) : (
              <>
                {/* Progress Chart */}
                <div className="mb-6">
                  <SkillProgressChart 
                    data={skillHistory} 
                    title="Your Skill Progress Over Time"
                  />
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {studentSkills.map((skill) => (
                  <div key={skill.skill_id} className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{skill.skill_name}</h3>
                    
                    <div className="flex items-center mb-3">
                      <span className="text-sm text-gray-500 mr-2">Rating:</span>
                      <div className="flex items-center">
                        {[...Array(10)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(parseFloat(skill.rating)) ? 'text-yellow-400' : 'text-gray-300'}`}
                            filled={i < Math.floor(parseFloat(skill.rating))}
                          />
                        ))}
                        <span className="ml-2 text-sm font-medium">{skill.rating}/10</span>
                      </div>
                    </div>

                    {skill.notes && (
                      <p className="text-sm text-gray-600 mb-3">{skill.notes}</p>
                    )}

                    <div className="text-xs text-gray-400">
                      <p>
                        {skill.coach_count 
                          ? `Rated by ${skill.coach_count} coach${skill.coach_count > 1 ? 'es' : ''} (avg)`
                          : `Coach: ${skill.coach_first_name} ${skill.coach_last_name}`
                        }
                      </p>
                      <p>Updated: {new Date(skill.rating_created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
                </div>

                {/* Student Comments Section */}
                <div className="mt-6">
                  <StudentComments 
                    studentId={user.userId} 
                    currentUser={user}
                  />
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    );
  }

  // Coach/Admin view - manage student skills
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
                <ChartBarIcon className="w-8 h-8 text-blue-600" />
                Skills Management
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user.firstName}!</span>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
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

          {/* Student Selection */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Select Student</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {students.map(student => (
                <button
                  key={student.id}
                  onClick={() => {
                    setSelectedStudent(student);
                    fetchStudentSkills(student.id);
                    fetchSkillHistory(student.id);
                  }}
                  className={`p-4 rounded-lg border-2 text-left transition-colors ${
                    selectedStudent?.id === student.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <UserIcon className="w-8 h-8 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {student.first_name} {student.last_name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {student.skills_count || 0} skills • Avg: {student.avg_rating || '0.0'}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Progress Chart - Only show when student is selected */}
          {selectedStudent && (
            <div className="mb-6">
              <SkillProgressChart 
                data={skillHistory} 
                title={`Skill Progress for ${selectedStudent.first_name} ${selectedStudent.last_name}`}
              />
            </div>
          )}

          {/* Skills Grid - Only show when student is selected */}
          {selectedStudent && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Skills for {selectedStudent.first_name} {selectedStudent.last_name}
              </h2>
              
              {loading ? (
                <div className="text-center py-8">Loading skills...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {commonSkills.map(skillName => {
                    const currentRating = getSkillRating(skillName);
                    
                    return (
                      <SkillCard
                        key={skillName}
                        skillName={skillName}
                        currentRating={currentRating}
                        onUpdate={addOrUpdateSkillRating}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Student Comments Section - Only show when student is selected */}
          {selectedStudent && (
            <div className="mt-6">
              <StudentComments 
                studentId={selectedStudent.id} 
                currentUser={user}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// Skill Card Component
const SkillCard = ({ skillName, currentRating, onUpdate }) => {
  const [rating, setRating] = useState(currentRating);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setRating(currentRating);
  }, [currentRating]);

  const handleSave = () => {
    onUpdate(skillName, rating, ''); // No notes for individual skills
    setIsEditing(false);
  };

  const handleCancel = () => {
    setRating(currentRating);
    setIsEditing(false);
  };

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <h3 className="font-semibold text-gray-900 mb-3">{skillName}</h3>
      
      {isEditing ? (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating: {rating}/10
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          
          
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="flex items-center">
              {[...Array(10)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  filled={i < rating}
                />
              ))}
              <span className="ml-2 text-sm font-medium">{rating}/10</span>
            </div>
          </div>
          
          
          <button
            onClick={() => setIsEditing(true)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
          >
            {rating > 0 ? 'Update Rating' : 'Add Rating'}
          </button>
        </div>
      )}
    </div>
  );
};

export default SkillsRedesigned;