import React from 'react';
import { useQuery } from 'react-query';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/userService';
import { skillService } from '../../services/skillService';
import SkillProgressChart from '../skills/SkillProgressChart';
import LoadingSpinner from '../common/LoadingSpinner';
import { TrophyIcon, ChartBarIcon, CalendarIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

const StudentDashboard = () => {
  const { user } = useAuth();

  const { data: dashboardData, isLoading, error } = useQuery(
    ['dashboard', user.id],
    () => userService.getStudentDashboard(user.id),
    {
      enabled: !!user?.id,
    }
  );

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-red-600">Error loading dashboard</div>;

  const {
    skillAverages = [],
    recentMatches = [],
    upcomingMatches = [],
    recentComments = []
  } = dashboardData || {};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user.first_name}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's your table tennis progress overview
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ChartBarIcon className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Overall Skill Average
                </dt>
                <dd className="text-lg font-medium text-gray-900">
                  {skillAverages.length > 0 
                    ? (skillAverages.reduce((sum, skill) => sum + skill.currentScore, 0) / skillAverages.length).toFixed(1)
                    : 'N/A'
                  }
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrophyIcon className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Matches Played
                </dt>
                <dd className="text-lg font-medium text-gray-900">
                  {recentMatches.length}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CalendarIcon className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Upcoming Matches
                </dt>
                <dd className="text-lg font-medium text-gray-900">
                  {upcomingMatches.length}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ChatBubbleLeftIcon className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Recent Feedback
                </dt>
                <dd className="text-lg font-medium text-gray-900">
                  {recentComments.length}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Skill Progress Chart */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Skill Progress</h3>
          </div>
          <div className="p-6">
            {skillAverages.length > 0 ? (
              <SkillProgressChart data={skillAverages} />
            ) : (
              <p className="text-gray-500 text-center py-8">
                No skill assessments yet
              </p>
            )}
          </div>
        </div>

        {/* Recent Comments */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Feedback</h3>
          </div>
          <div className="p-6">
            {recentComments.length > 0 ? (
              <div className="space-y-4">
                {recentComments.slice(0, 3).map((comment, index) => (
                  <div key={index} className="border-l-4 border-blue-400 pl-4">
                    <p className="text-sm text-gray-800">{comment.comment}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      By {comment.coach_name} • {new Date(comment.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No feedback yet
              </p>
            )}
          </div>
        </div>

        {/* Upcoming Matches */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Upcoming Matches</h3>
          </div>
          <div className="p-6">
            {upcomingMatches.length > 0 ? (
              <div className="space-y-4">
                {upcomingMatches.slice(0, 3).map((match, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        vs {match.opponent_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(match.scheduled_date).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {match.league_name}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No upcoming matches
              </p>
            )}
          </div>
        </div>

        {/* Recent Match Results */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Results</h3>
          </div>
          <div className="p-6">
            {recentMatches.length > 0 ? (
              <div className="space-y-4">
                {recentMatches.slice(0, 3).map((match, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        vs {match.opponent_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(match.completed_date).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      match.won ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {match.won ? 'Won' : 'Lost'} {match.score}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No match history yet
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;