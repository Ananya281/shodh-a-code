const cls = {
  Accepted: "bg-green-100 text-green-800",
  "Wrong Answer": "bg-red-100 text-red-800",
  "Time Limit Exceeded": "bg-yellow-100 text-yellow-800",
  "Runtime Error": "bg-orange-100 text-orange-800",
  "Compilation Error": "bg-purple-100 text-purple-800",
  Pending: "bg-gray-100 text-gray-800",
  Running: "bg-blue-100 text-blue-800",
  "System Error": "bg-zinc-200 text-zinc-800",
};

export default function SubmissionStatus({ submission }) {
  if (!submission) return null;
  const klass = cls[submission.status] || "bg-gray-100 text-gray-800";
  return <div className={`px-3 py-2 rounded ${klass}`}><b>Status: </b>{submission.status}</div>;
}
