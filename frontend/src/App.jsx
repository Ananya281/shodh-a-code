import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Contests from "./pages/Contests";
import Problems from "./pages/Problems";
import Submit from "./pages/Submit";
import Leaderboard from "./pages/Leaderboard";

function App() {
  return (
    <div className="text-center mt-10">
      <h1 className="text-4xl font-bold text-blue-600">
        Tailwind Working 🎉
      </h1>
      <p className="text-gray-600 mt-2">Frontend setup complete ✅</p>
    </div>
  );
}


export default App;
