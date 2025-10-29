import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
});

// ✅ Contest endpoints
export const getContest = (id) => API.get(`/api/contests/${id}`);
export const getProblem = (contestId, problemId) => API.get(`/api/contests/${contestId}/problems/${problemId}`);

// ✅ Submissions (used by ContestPage.jsx)
export const createSubmission = (data) => API.post("/api/submissions", data);
export const getSubmission = (id) => API.get(`/api/submissions/${id}`);

// ✅ Leaderboard
export const getLeaderboard = (id) => API.get(`/api/contests/${id}/leaderboard`);
