// API configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '' // Use relative URLs in production (same domain)
  : 'http://localhost:3001'; // Use localhost in development

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  SKILLS: `${API_BASE_URL}/api/skills`,
  SKILLS_STUDENTS: `${API_BASE_URL}/api/skills/students`,
  PUBLIC_LEAGUES: `${API_BASE_URL}/api/public/leagues`
};

export default API_BASE_URL;