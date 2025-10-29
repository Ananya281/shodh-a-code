import { useQuery } from "@tanstack/react-query";
import { getLeaderboard } from "../services/api.js";

export default function Leaderboard({ contestId }) {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["leaderboard", contestId],
    queryFn: () => getLeaderboard(contestId),
    enabled: !!contestId,
    refetchInterval: 15000, // refresh every 15s
  });

  if (isLoading) {
    return (
      <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 animate-pulse">
        <h2 className="font-semibold text-blue-400 mb-3">Leaderboard</h2>
        <p className="text-gray-600 text-sm">Loading leaderboard…</p>
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-center">
        <h2 className="font-semibold text-blue-400 mb-3">Leaderboard</h2>
        <p className="text-gray-500 text-sm">No submissions yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-blue-400">Leaderboard</h2>
        {isFetching && (
          <span className="text-xs text-gray-500 animate-pulse">⟳ updating...</span>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-300">
          <thead>
            <tr className="text-left border-b border-gray-800 text-gray-400">
              <th className="py-2 pr-2">#</th>
              <th className="py-2 pr-2">User</th>
              <th className="py-2 pr-2">Solved</th>
              <th className="py-2 pr-2">Penalty</th>
              <th className="py-2">Last Update</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr
                key={row.username}
                className={`border-b border-gray-800 hover:bg-gray-800 transition-all ${
                  i === 0
                    ? "bg-gradient-to-r from-yellow-700/30 to-transparent"
                    : i === 1
                    ? "bg-gradient-to-r from-gray-700/20 to-transparent"
                    : i === 2
                    ? "bg-gradient-to-r from-amber-800/10 to-transparent"
                    : ""
                }`}
              >
                <td className="py-2 pr-2 font-semibold text-gray-200">{i + 1}</td>
                <td className="py-2 pr-2">
                  <span
                    className={`font-medium ${
                      i === 0
                        ? "text-yellow-400"
                        : i === 1
                        ? "text-gray-300"
                        : i === 2
                        ? "text-amber-500"
                        : "text-gray-200"
                    }`}
                  >
                    {row.username}
                  </span>
                </td>
                <td className="py-2 pr-2 text-center text-green-400 font-medium">
                  {row.solved}
                </td>
                <td className="py-2 pr-2 text-center text-red-400">{row.penalty}</td>
                <td className="py-2 text-xs text-gray-500">
                  {new Date(row.lastUpdated).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
