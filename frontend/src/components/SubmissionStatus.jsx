const cls = {
  Accepted: "bg-green-900/30 text-green-400 border border-green-700",
  "Wrong Answer": "bg-red-900/30 text-red-400 border border-red-700",
  "Time Limit Exceeded": "bg-yellow-900/30 text-yellow-400 border border-yellow-700",
  "Runtime Error": "bg-orange-900/30 text-orange-400 border border-orange-700",
  "Compilation Error": "bg-purple-900/30 text-purple-400 border border-purple-700",
  Pending: "bg-gray-800 text-gray-300 border border-gray-700",
  Running: "bg-blue-900/30 text-blue-400 border border-blue-700 animate-pulse",
  "System Error": "bg-zinc-800 text-zinc-400 border border-zinc-700",
};

export default function SubmissionStatus({ submission }) {
  if (!submission) return null;
  const klass = cls[submission.status] || "bg-gray-800 text-gray-300 border border-gray-700";

  return (
    <div
      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${klass}`}
    >
      <b className="text-gray-400">Status:</b> {submission.status}
    </div>
  );
}
