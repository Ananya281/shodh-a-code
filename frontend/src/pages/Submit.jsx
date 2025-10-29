import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

const Submit = () => {
  const { id } = useParams();
  const [code, setCode] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async () => {
    try {
      const res = await api.post("/submissions", {
        problemId: id,
        userId: 1, // test user
        code,
        language: "Python"
      });
      setStatus(res.data.status || "Submitted!");
    } catch (error) {
      setStatus("Error submitting code.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Submit Code for Problem #{id}</h1>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Write your code here..."
        className="w-full h-60 p-3 border rounded-md font-mono bg-gray-50 mb-4"
      />
      <button onClick={handleSubmit} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
        Submit
      </button>
      {status && <p className="mt-4 text-center text-lg font-medium">{status}</p>}
    </div>
  );
};

export default Submit;
