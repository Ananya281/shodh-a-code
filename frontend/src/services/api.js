import axios from "axios";

// ✅ Create Axios instance with fallback URL
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
});

// ✅ Fetch contest details
export const getContest = (id) => API.get(`/api/contests/${id}`).then(res => res.data);

// ✅ Submit code (judge)
export const submitCode = (data) => API.post(`/api/judge`, data).then(res => res.data);

// ✅ Get submission status
export const getSubmission = (id) => API.get(`/api/submissions/${id}`).then(res => res.data);

// ✅ Get leaderboard
export const getLeaderboard = (id) => API.get(`/api/contests/${id}/leaderboard`).then(res => res.data);
