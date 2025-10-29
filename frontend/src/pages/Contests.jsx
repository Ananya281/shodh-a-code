import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

const Contests = () => {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    api.get("/contests")
      .then(res => setContests(res.data))
      .catch(err => console.error("Error fetching contests:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Available Contests</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contests.map(c => (
          <div key={c.id} className="bg-white shadow-lg rounded-xl p-5 border border-gray-100 hover:shadow-xl transition">
            <h2 className="text-xl font-bold mb-2 text-blue-600">{c.name}</h2>
            <p className="text-gray-700 mb-3">{c.description}</p>
            <Link to={`/contest/${c.id}`} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              View Problems
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contests;
