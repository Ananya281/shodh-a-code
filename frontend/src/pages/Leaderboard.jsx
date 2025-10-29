import { useEffect, useState } from "react";
import api from "../api/axios";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error("Error fetching leaderboard:", err));
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Leaderboard</h1>
      <table className="w-full border-collapse shadow-md">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-2">Rank</th>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {users.sort((a, b) => b.score - a.score).map((user, index) => (
            <tr key={user.id} className="text-center border-b">
              <td className="py-2">{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
