import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

export default function JoinPage() {
  const [contestId, setContestId] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contestId.trim() || !username.trim())
      return toast.error("Enter both fields!");
    sessionStorage.setItem("shodha_username", username.trim());
    navigate(`/contest/${contestId.trim()}`);
  };

  return (
    <div className="flex items-center justify-center h-[85vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-10 w-full max-w-md shadow-2xl border border-white/10 space-y-5"
      >
        <h1 className="text-3xl font-semibold text-center text-indigo-400">
          Join Contest
        </h1>
        <p className="text-center text-sm text-gray-400">
          Enter your Contest ID and Username to start coding
        </p>

        <div>
          <label className="block text-sm mb-1 text-gray-300">Contest ID</label>
          <input
            value={contestId}
            onChange={(e) => setContestId(e.target.value)}
            placeholder="e.g. contest-001"
            className="w-full rounded-lg px-4 py-2 bg-white/10 border border-white/20 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-gray-300">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
            className="w-full rounded-lg px-4 py-2 bg-white/10 border border-white/20 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg font-semibold transition"
        >
          Enter Contest
        </button>
      </form>
    </div>
  );
}
