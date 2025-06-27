# Table Tennis Academy - Project Structure

## Backend Structure (Node.js/Express)

```
tt-academy-backend/
├── src/
│   ├── config/
│   │   ├── database.js          # Database connection config
│   │   ├── auth.js              # JWT configuration
│   │   └── environment.js       # Environment variables
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── userController.js    # User management
│   │   ├── skillController.js   # Skill assessments
│   │   ├── commentController.js # Coach comments
│   │   ├── leagueController.js  # League management
│   │   └── matchController.js   # Match management
│   ├── middleware/
│   │   ├── auth.js              # JWT verification
│   │   ├── validation.js        # Request validation
│   │   ├── errorHandler.js      # Global error handling
│   │   └── roleCheck.js         # Role-based access control
│   ├── models/
│   │   ├── User.js              # User model
│   │   ├── StudentProfile.js    # Student profile model
│   │   ├── SkillAssessment.js   # Skill assessment model
│   │   ├── CoachComment.js      # Comment model
│   │   ├── League.js            # League model
│   │   └── Match.js             # Match model
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   ├── users.js             # User routes
│   │   ├── skills.js            # Skill assessment routes
│   │   ├── comments.js          # Comment routes
│   │   ├── leagues.js           # League routes
│   │   └── matches.js           # Match routes
│   ├── services/
│   │   ├── authService.js       # Authentication business logic
│   │   ├── emailService.js      # Email notifications
│   │   ├── analyticsService.js  # Data analytics
│   │   └── validationService.js # Data validation
│   ├── utils/
│   │   ├── logger.js            # Logging utility
│   │   ├── helpers.js           # Common helper functions
│   │   └── constants.js         # Application constants
│   └── app.js                   # Express app setup
├── tests/
│   ├── unit/
│   ├── integration/
│   └── fixtures/
├── migrations/
│   ├── 001_create_users.sql
│   ├── 002_create_skills.sql
│   └── ...
├── seeds/
│   └── initial_data.sql
├── package.json
├── .env.example
├── .gitignore
├── README.md
└── server.js                    # Entry point
```

## Frontend Structure (React Web)

```
tt-academy-frontend/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── ErrorBoundary.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── auth/
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegisterForm.jsx
│   │   │   └── ForgotPassword.jsx
│   │   ├── dashboard/
│   │   │   ├── StudentDashboard.jsx
│   │   │   ├── CoachDashboard.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── profile/
│   │   │   ├── StudentProfile.jsx
│   │   │   ├── EditProfile.jsx
│   │   │   └── SkillChart.jsx
│   │   ├── skills/
│   │   │   ├── SkillAssessmentForm.jsx
│   │   │   ├── SkillProgressChart.jsx
│   │   │   └── SkillHistory.jsx
│   │   ├── comments/
│   │   │   ├── CommentList.jsx
│   │   │   ├── CommentForm.jsx
│   │   │   └── CommentCard.jsx
│   │   ├── leagues/
│   │   │   ├── LeagueList.jsx
│   │   │   ├── LeagueDetail.jsx
│   │   │   ├── LeagueRegistration.jsx
│   │   │   └── CreateLeague.jsx
│   │   └── matches/
│   │       ├── MatchList.jsx
│   │       ├── MatchDetail.jsx
│   │       ├── MatchResult.jsx
│   │       └── MatchScheduler.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useApi.js
│   │   ├── useLocalStorage.js
│   │   └── useWebSocket.js
│   ├── services/
│   │   ├── api.js               # Axios configuration
│   │   ├── authService.js       # Authentication API calls
│   │   ├── userService.js       # User API calls
│   │   ├── skillService.js      # Skill API calls
│   │   └── leagueService.js     # League API calls
│   ├── context/
│   │   ├── AuthContext.jsx      # Authentication state
│   │   ├── ThemeContext.jsx     # UI theme state
│   │   └── NotificationContext.jsx # Notifications
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── LeaguesPage.jsx
│   │   ├── MatchesPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── utils/
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   ├── validators.js
│   │   └── formatters.js
│   ├── styles/
│   │   ├── globals.css
│   │   ├── components.css
│   │   └── tailwind.css
│   ├── App.jsx
│   └── index.js
├── package.json
├── tailwind.config.js
├── .env.example
├── .gitignore
└── README.md
```

## Mobile App Structure (React Native)

```
tt-academy-mobile/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Card.jsx
│   │   │   └── LoadingScreen.jsx
│   │   ├── navigation/
│   │   │   ├── AppNavigator.jsx
│   │   │   ├── AuthNavigator.jsx
│   │   │   └── TabNavigator.jsx
│   │   ├── screens/
│   │   │   ├── auth/
│   │   │   │   ├── LoginScreen.jsx
│   │   │   │   └── RegisterScreen.jsx
│   │   │   ├── dashboard/
│   │   │   │   └── DashboardScreen.jsx
│   │   │   ├── profile/
│   │   │   │   ├── ProfileScreen.jsx
│   │   │   │   └── EditProfileScreen.jsx
│   │   │   ├── skills/
│   │   │   │   ├── SkillsScreen.jsx
│   │   │   │   └── SkillDetailScreen.jsx
│   │   │   ├── leagues/
│   │   │   │   ├── LeaguesScreen.jsx
│   │   │   │   └── LeagueDetailScreen.jsx
│   │   │   └── matches/
│   │   │       ├── MatchesScreen.jsx
│   │   │       └── MatchDetailScreen.jsx
│   │   └── charts/
│   │       ├── SkillChart.jsx
│   │       └── ProgressChart.jsx
│   ├── services/
│   │   ├── api.js
│   │   ├── storage.js
│   │   └── notifications.js
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── utils/
│   │   ├── constants.js
│   │   └── helpers.js
│   └── styles/
│       ├── colors.js
│       ├── fonts.js
│       └── common.js
├── android/
├── ios/
├── package.json
├── metro.config.js
├── babel.config.js
└── README.md
```