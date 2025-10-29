import { useQuery } from "@tanstack/react-query";
import { getLeaderboard } from "../lib/api.js";

export default function Leaderboard({ contestId }) {
  const { data, isLoading } = useQuery({
    queryKey: ["leaderboard", contestId],
    queryFn: () => getLeaderboard(contestId),
    enabled: !!contestId,
    refetchInterval: 15000,
  });

  if (isLoading) return <div className="bg-white rounded-xl shadow p-3">Loading leaderboard…</div>;

  return (
    <div className="bg-white rounded-xl shadow p-3">
      <h2 className="font-medium mb-2">Leaderboard</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">#</th><th>User</th><th>Solved</th><th>Penalty</th><th>Last Update</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row, i) => (
            <tr key={row.username} className="border-b">
              <td className="py-2">{i + 1}</td>
              <td>{row.username}</td>
              <td>{row.solved}</td>
              <td>{row.penalty}</td>
              <td className="text-xs text-gray-500">{new Date(row.lastUpdated).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
