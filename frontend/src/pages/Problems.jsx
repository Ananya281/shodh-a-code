import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

const Problems = () => {
  const { id } = useParams();
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    api.get(`/contests/${id}/problems`)
      .then(res => setProblems(res.data))
      .catch(err => console.error("Error fetching problems:", err));
  }, [id]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Problems in Contest #{id}</h1>
      <div className="grid gap-6">
        {problems.map(p => (
          <div key={p.id} className="bg-white shadow-md rounded-lg p-5 border border-gray-200">
            <h2 className="text-xl font-bold text-blue-600">{p.title}</h2>
            <p className="text-gray-700 mb-2">{p.description}</p>
            <Link to={`/problem/${p.id}/submit`} className="text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700">
              Submit Solution
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Problems;
