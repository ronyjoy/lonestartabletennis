# Table Tennis Academy API Specification

## Authentication Endpoints

### POST /api/auth/login
**Description:** User login  
**Body:**
```json
{
  "email": "string",
  "password": "string"
}
```
**Response:**
```json
{
  "token": "string",
  "user": {
    "id": "number",
    "email": "string",
    "firstName": "string",
    "lastName": "string",
    "role": "student|coach|admin"
  }
}
```

### POST /api/auth/register
**Description:** User registration  
**Body:**
```json
{
  "email": "string",
  "password": "string",
  "firstName": "string",
  "lastName": "string",
  "role": "student|coach",
  "phone": "string",
  "dateOfBirth": "string"
}
```

### POST /api/auth/logout
**Description:** User logout

## User Management Endpoints

### GET /api/users/profile
**Description:** Get current user profile  
**Headers:** Authorization: Bearer {token}

### PUT /api/users/profile
**Description:** Update user profile  
**Headers:** Authorization: Bearer {token}

### GET /api/students
**Description:** Get all students (coach/admin only)  
**Headers:** Authorization: Bearer {token}

### GET /api/students/:id
**Description:** Get specific student details  
**Headers:** Authorization: Bearer {token}

## Skill Assessment Endpoints

### GET /api/students/:id/assessments
**Description:** Get all skill assessments for a student  
**Headers:** Authorization: Bearer {token}

### POST /api/students/:id/assessments
**Description:** Create new skill assessment (coach only)  
**Headers:** Authorization: Bearer {token}  
**Body:**
```json
{
  "skillCategoryId": "number",
  "score": "number",
  "notes": "string",
  "assessmentDate": "string"
}
```

### GET /api/students/:id/assessments/progress
**Description:** Get skill progress over time  
**Headers:** Authorization: Bearer {token}  
**Query:** ?skillCategoryId=1&startDate=2024-01-01&endDate=2024-12-31

### GET /api/skill-categories
**Description:** Get all skill categories

## Coach Comments Endpoints

### GET /api/students/:id/comments
**Description:** Get comments for a student  
**Headers:** Authorization: Bearer {token}

### POST /api/students/:id/comments
**Description:** Add comment for student (coach only)  
**Headers:** Authorization: Bearer {token}  
**Body:**
```json
{
  "comment": "string",
  "skillCategoryId": "number|null",
  "isPrivate": "boolean"
}
```

### PUT /api/comments/:id
**Description:** Update comment (coach who created it only)  
**Headers:** Authorization: Bearer {token}

### DELETE /api/comments/:id
**Description:** Delete comment (coach who created it only)  
**Headers:** Authorization: Bearer {token}

## League Management Endpoints

### GET /api/leagues
**Description:** Get all leagues  
**Query:** ?status=open&skillLevel=5

### GET /api/leagues/:id
**Description:** Get specific league details

### POST /api/leagues
**Description:** Create new league (admin only)  
**Headers:** Authorization: Bearer {token}  
**Body:**
```json
{
  "name": "string",
  "description": "string",
  "startDate": "string",
  "endDate": "string",
  "registrationDeadline": "string",
  "maxParticipants": "number",
  "skillLevelMin": "number",
  "skillLevelMax": "number",
  "entryFee": "number"
}
```

### PUT /api/leagues/:id
**Description:** Update league (admin only)  
**Headers:** Authorization: Bearer {token}

### DELETE /api/leagues/:id
**Description:** Delete league (admin only)  
**Headers:** Authorization: Bearer {token}

## League Registration Endpoints

### POST /api/leagues/:id/register
**Description:** Register for a league  
**Headers:** Authorization: Bearer {token}

### DELETE /api/leagues/:id/register
**Description:** Unregister from a league  
**Headers:** Authorization: Bearer {token}

### GET /api/leagues/:id/participants
**Description:** Get league participants  
**Headers:** Authorization: Bearer {token}

## League Groups Endpoints

### GET /api/leagues/:id/groups
**Description:** Get groups in a league

### POST /api/leagues/:id/groups
**Description:** Create group in league (admin only)  
**Headers:** Authorization: Bearer {token}

### POST /api/groups/:id/members
**Description:** Add member to group (admin only)  
**Headers:** Authorization: Bearer {token}  
**Body:**
```json
{
  "studentId": "number"
}
```

## Match Management Endpoints

### GET /api/leagues/:id/matches
**Description:** Get matches in a league  
**Query:** ?groupId=1&status=scheduled

### GET /api/matches/:id
**Description:** Get specific match details

### POST /api/leagues/:id/matches
**Description:** Create new match (admin only)  
**Headers:** Authorization: Bearer {token}  
**Body:**
```json
{
  "groupId": "number|null",
  "player1Id": "number",
  "player2Id": "number",
  "scheduledDate": "string",
  "matchFormat": "best_of_3|best_of_5|best_of_7"
}
```

### PUT /api/matches/:id/result
**Description:** Record match result  
**Headers:** Authorization: Bearer {token}  
**Body:**
```json
{
  "games": [
    {"player1Score": 11, "player2Score": 9},
    {"player1Score": 11, "player2Score": 7},
    {"player1Score": 9, "player2Score": 11}
  ],
  "notes": "string"
}
```

### GET /api/students/:id/matches
**Description:** Get matches for a student  
**Query:** ?status=completed&limit=10

## Dashboard/Analytics Endpoints

### GET /api/dashboard/student/:id
**Description:** Get student dashboard data  
**Headers:** Authorization: Bearer {token}  
**Response:**
```json
{
  "skillAverages": [{"skillName": "Serve", "currentScore": 7, "previousScore": 6}],
  "recentMatches": [],
  "upcomingMatches": [],
  "recentComments": []
}
```

### GET /api/dashboard/coach
**Description:** Get coach dashboard data  
**Headers:** Authorization: Bearer {token}

### GET /api/analytics/skill-distribution
**Description:** Get skill score distribution (admin only)  
**Headers:** Authorization: Bearer {token}

## Error Responses

All endpoints return errors in this format:
```json
{
  "error": {
    "code": "string",
    "message": "string",
    "details": "object|null"
  }
}
```

Common HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict
- 500: Internal Server Error