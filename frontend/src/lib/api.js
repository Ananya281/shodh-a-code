import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 20000,
});

export async function getContest(contestId) {
  const { data } = await api.get(`/api/contests/${contestId}`);
  return data;
}

export async function getProblem(contestId, problemId) {
  const { data } = await api.get(`/api/contests/${contestId}/problems/${problemId}`);
  return data;
}

export async function createSubmission(payload) {
  const { data } = await api.post(`/api/submissions`, payload);
  return data;
}

export async function getSubmission(submissionId) {
  const { data } = await api.get(`/api/submissions/${submissionId}`);
  return data;
}

export async function getLeaderboard(contestId) {
  const { data } = await api.get(`/api/contests/${contestId}/leaderboard`);
  return data;
}
