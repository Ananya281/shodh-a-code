import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
});

// ✅ Contest endpoints
export const getContest = async (id) => {
  const { data } = await API.get(`/api/contests/${id}`);
  return data;
};

export const getProblem = async (contestId, problemId) => {
  const { data } = await API.get(`/api/contests/${contestId}/problems/${problemId}`);
  return data;
};

// ✅ Submissions (Create & Fetch)
export const createSubmission = async ({ problemId, userId, language, code }) => {
  const submissionPayload = {
    code,
    language,
    user: { id: userId },
    problem: { id: problemId },
  };

  const { data } = await API.post("/api/submissions", submissionPayload);
  return data;
};


export const getSubmission = async (id) => {
  const { data } = await API.get(`/api/submissions/${id}`);
  return data;
};

// ✅ Leaderboard
export const getLeaderboard = async (id) => {
  const { data } = await API.get(`/api/contests/${id}/leaderboard`);
  return data;
};
