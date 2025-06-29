import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../config/api';
import { 
  UserIcon, 
  AcademicCapIcon, 
  ClockIcon,
  PlusIcon,
  TrashIcon
} from './icons';

const StudentComments = ({ studentId, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [student, setStudent] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (studentId) {
      fetchComments();
    }
  }, [studentId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      console.log('Fetching comments for studentId:', studentId);
      console.log('Current user:', currentUser);
      console.log('Token exists:', !!token);
      console.log('API URL:', `${API_ENDPOINTS.SKILLS}/comments/${studentId}`);
      
      const response = await fetch(`${API_ENDPOINTS.SKILLS}/comments/${studentId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      console.log('Comments response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Comments data received:', data);
        setComments(data.comments || []);
        setStudent(data.student);
      } else {
        const errorData = await response.json();
        console.error('Failed to fetch comments:', response.status, errorData);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveComment = async (commentText) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_ENDPOINTS.SKILLS}/comments/${studentId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ comment: commentText })
      });

      if (response.ok) {
        setMessage('Comment saved successfully!');
        setNewComment('');
        setEditingComment(null);
        fetchComments();
        setTimeout(() => setMessage(''), 3000);
      } else {
        const data = await response.json();
        setMessage(data.error?.message || 'Failed to save comment');
      }
    } catch (error) {
      setMessage('Error saving comment');
    }
  };

  const deleteComment = async (commentId) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_ENDPOINTS.SKILLS}/comments/${commentId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        setMessage('Comment deleted successfully!');
        fetchComments();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Failed to delete comment');
      }
    } catch (error) {
      setMessage('Error deleting comment');
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      saveComment(newComment.trim());
    }
  };

  const canAddComment = currentUser.role === 'coach' || currentUser.role === 'admin';
  const isOwnComment = (comment) => comment.coach_id === currentUser.userId;

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center py-4">Loading comments...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <UserIcon className="w-6 h-6 text-blue-600" />
          {currentUser.role === 'student' ? 'Feedback from Coaches' : `Comments for ${student?.first_name} ${student?.last_name}`}
        </h3>
      </div>

      {message && (
        <div className={`mb-4 p-3 rounded ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}

      {/* Add Comment Form - Only for coaches and admins */}
      {canAddComment && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <form onSubmit={handleAddComment}>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add General Comment
              </label>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add general feedback about the student's progress, attitude, areas for improvement, etc..."
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center gap-2"
            >
              <PlusIcon className="w-4 h-4" />
              {comments.some(c => isOwnComment(c)) ? 'Update Comment' : 'Add Comment'}
            </button>
          </form>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {currentUser.role === 'student' 
              ? "No feedback from coaches yet." 
              : "No comments added yet. Add a general comment about this student's progress."}
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <AcademicCapIcon className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-gray-900">
                    {comment.coach_first_name} {comment.coach_last_name}
                  </span>
                  {currentUser.role !== 'student' && isOwnComment(comment) && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      Your Comment
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    {new Date(comment.updated_at || comment.created_at).toLocaleDateString()}
                  </div>
                  {canAddComment && isOwnComment(comment) && (
                    <button
                      onClick={() => deleteComment(comment.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete comment"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
              
              <p className="text-gray-700 whitespace-pre-wrap">{comment.comment}</p>
              
              {comment.updated_at && comment.updated_at !== comment.created_at && (
                <p className="text-xs text-gray-400 mt-2">
                  Last updated: {new Date(comment.updated_at).toLocaleString()}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentComments;