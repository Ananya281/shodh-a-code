import { Routes, Route, Navigate } from "react-router-dom";
import JoinPage from "./pages/JoinPage.jsx";
import ContestPage from "./pages/ContestPage.jsx";
import Navbar from "./components/Navbar.jsx";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<JoinPage />} />
        <Route path="/contest/:contestId" element={<ContestPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster position="top-center" />
    </div>
  );
}
