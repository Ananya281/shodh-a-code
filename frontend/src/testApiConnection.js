import { getContest, submitCode, getSubmission, getLeaderboard } from "./services/api.js";

async function testAPI() {
  try {
    console.log("Testing GET /api/contests/1");
    const contest = await getContest(1);
    console.log("✅ Contest fetched:", contest);

    console.log("Testing GET /api/contests/1/leaderboard");
    const leaderboard = await getLeaderboard(1);
    console.log("✅ Leaderboard fetched:", leaderboard);
  } catch (err) {
    console.error("❌ API error:", err);
  }
}

testAPI();
