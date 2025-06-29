import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';
import SkillProgressChart from './SkillProgressChart';
import StudentComments from './StudentComments';
import BadgeSystem from './BadgeSystem';
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
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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
        fetchStudentSkills(parsedUser.id);
        fetchSkillHistory();
      } else {
        // For coaches/admins, fetch students list
        fetchStudents();
      }
    }
  }, [navigate]);

  // Filter students based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter(student => 
        `${student.first_name} ${student.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  }, [searchTerm, students]);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_ENDPOINTS.SKILLS}/students`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setStudents(data.students);
        setFilteredStudents(data.students);
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
        return true; // Success
      } else {
        const data = await response.json();
        const errorMessage = data.error?.message || 'Failed to update skill rating';
        setMessage(errorMessage);
        throw new Error(errorMessage);
      }
    } catch (error) {
      const errorMessage = 'Error updating skill rating';
      setMessage(errorMessage);
      throw error; // Re-throw so SkillCard can handle it
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
                  Skill Metrics
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
                {/* Performance Summary */}
                <div className="bg-white shadow rounded-lg mb-6">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">Your Performance Summary</h2>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">{studentSkills.length}</div>
                        <div className="text-sm text-gray-600">Skills Evaluated</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">
                          {studentSkills.length > 0 
                            ? (studentSkills.reduce((sum, skill) => sum + parseFloat(skill.rating), 0) / studentSkills.length).toFixed(1)
                            : '0.0'
                          }
                        </div>
                        <div className="text-sm text-gray-600">Average Rating</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600">
                          {(() => {
                            const avgRating = studentSkills.length > 0 
                              ? (studentSkills.reduce((sum, skill) => sum + parseFloat(skill.rating), 0) / studentSkills.length)
                              : 0;
                            return avgRating >= 8 ? 'Advanced' : avgRating >= 6 ? 'Intermediate' : avgRating >= 4 ? 'Beginner' : 'Starting';
                          })()}
                        </div>
                        <div className="text-sm text-gray-600">Level</div>
                      </div>
                    </div>
                  </div>
                </div>

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

                {/* Student Badges Section */}
                <div className="mt-6">
                  <BadgeSystem 
                    studentId={user.id} 
                    currentUser={user}
                    isManageView={false}
                  />
                </div>

                {/* Student Comments Section */}
                <div className="mt-6">
                  <StudentComments 
                    studentId={user.id} 
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
                {user.role === 'admin' ? 'Skill Metrics Overview' : 'Skills Management'}
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
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">Select Student</h2>
              <div className="text-sm text-gray-500">
                {filteredStudents.length} of {students.length} students
              </div>
            </div>
            
            {/* Search Box */}
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search students by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStudents.length === 0 ? (
                <div className="col-span-full text-center py-8 text-gray-500">
                  {searchTerm ? `No students found matching "${searchTerm}"` : 'No students available'}
                </div>
              ) : (
                filteredStudents.map(student => (
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
                ))
              )}
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
                {user.role === 'admin' && <span className="text-sm text-gray-500 ml-2">(View Only)</span>}
              </h2>
              
              {loading ? (
                <div className="text-center py-8">Loading skills...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {commonSkills.map(skillName => {
                    const currentRating = getSkillRating(skillName);
                    
                    if (user.role === 'admin') {
                      return (
                        <SkillViewCard
                          key={skillName}
                          skillName={skillName}
                          currentRating={currentRating}
                          studentSkills={studentSkills}
                        />
                      );
                    } else {
                      return (
                        <SkillCard
                          key={skillName}
                          skillName={skillName}
                          currentRating={currentRating}
                          onUpdate={addOrUpdateSkillRating}
                        />
                      );
                    }
                  })}
                </div>
              )}
            </div>
          )}

          {/* Badge Management Section - Only show when student is selected and user is coach */}
          {selectedStudent && user.role === 'coach' && (
            <div className="mt-6">
              <BadgeSystem 
                studentId={selectedStudent.id} 
                currentUser={user}
                isManageView={true}
              />
            </div>
          )}

          {/* Badge View Section - For admins, show badges in view-only mode */}
          {selectedStudent && user.role === 'admin' && (
            <div className="mt-6">
              <BadgeSystem 
                studentId={selectedStudent.id} 
                currentUser={user}
                isManageView={false}
              />
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

// Skill View Card Component (for admins - view only)
const SkillViewCard = ({ skillName, currentRating, studentSkills }) => {
  const skillData = studentSkills.find(skill => skill.skill_name === skillName);
  
  return (
    <div className="border rounded-lg p-4 bg-gray-50 relative">
      {/* Read-only overlay */}
      <div className="absolute top-2 right-2">
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-600">
          👁️ View Only
        </span>
      </div>
      
      <h3 className="font-semibold text-gray-900 mb-3 pr-20">{skillName}</h3>
      
      <div className="space-y-3">
        <div className="flex items-center">
          <div className="flex items-center">
            {/* Non-interactive stars */}
            {[...Array(10)].map((_, i) => (
              <StarIcon
                key={i}
                className={`w-5 h-5 pointer-events-none ${
                  i < currentRating ? 'text-yellow-400' : 'text-gray-300'
                }`}
                filled={i < currentRating}
              />
            ))}
            <span className="ml-2 text-sm font-medium text-gray-700">
              {currentRating > 0 ? `${currentRating}/10` : 'Not Rated'}
            </span>
          </div>
        </div>
        
        {skillData ? (
          <div className="text-xs text-gray-500 space-y-1">
            <p className="flex items-center gap-1">
              <span className="font-medium">Coach:</span> 
              {skillData.coach_first_name} {skillData.coach_last_name}
            </p>
            <p className="flex items-center gap-1">
              <span className="font-medium">Updated:</span> 
              {new Date(skillData.rating_created_at).toLocaleDateString()}
            </p>
            {skillData.notes && (
              <p className="mt-2 p-2 bg-white rounded border text-gray-600">
                <span className="font-medium">Notes:</span> {skillData.notes}
              </p>
            )}
          </div>
        ) : (
          <div className="text-xs text-gray-400 italic">
            No rating assigned yet
          </div>
        )}
        
        <div className="text-xs text-gray-400 border-t pt-2 mt-3">
          🔒 Read-only view • Contact coach to update ratings
        </div>
      </div>
    </div>
  );
};

// Skill Card Component
const SkillCard = ({ skillName, currentRating, onUpdate }) => {
  const [rating, setRating] = useState(currentRating);
  const [hoverRating, setHoverRating] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setRating(currentRating);
  }, [currentRating]);

  const handleStarClick = async (starIndex) => {
    const newRating = starIndex + 1;
    const previousRating = rating;
    
    try {
      setSaving(true);
      setError('');
      setRating(newRating); // Optimistically update UI
      
      await onUpdate(skillName, newRating, ''); // Save immediately when star is clicked
    } catch (err) {
      // Revert to previous rating on error
      setRating(previousRating);
      setError('Failed to update rating. Please try again.');
      console.error('Error updating skill rating:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleStarHover = (starIndex) => {
    setHoverRating(starIndex + 1);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const displayRating = hoverRating || rating;

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <h3 className="font-semibold text-gray-900 mb-3">{skillName}</h3>
      
      <div className="space-y-3">
        {error && (
          <div className="text-xs text-red-600 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}
        
        <div className="flex items-center">
          <div className="flex items-center" onMouseLeave={handleMouseLeave}>
            {[...Array(10)].map((_, i) => (
              <StarIcon
                key={i}
                className={`w-5 h-5 transition-colors hover:scale-110 ${
                  saving 
                    ? 'cursor-wait opacity-60' 
                    : 'cursor-pointer'
                } ${
                  i < displayRating ? 'text-yellow-400 hover:text-yellow-500' : 'text-gray-300 hover:text-yellow-200'
                }`}
                filled={i < displayRating}
                onClick={() => !saving && handleStarClick(i)}
                onMouseEnter={() => !saving && handleStarHover(i)}
              />
            ))}
            <span className="ml-2 text-sm font-medium">
              {displayRating}/10 {saving && <span className="text-xs text-blue-600">(saving...)</span>}
            </span>
          </div>
        </div>
        
        <div className="text-xs text-gray-500">
          {saving 
            ? 'Saving rating...' 
            : rating === 0 
              ? 'Click stars to rate this skill' 
              : 'Click stars to update rating'
          }
        </div>
      </div>
    </div>
  );
};

export default SkillsRedesigned;