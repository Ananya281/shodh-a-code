import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="backdrop-blur-lg bg-white/5 border-b border-white/10 px-6 py-3 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-indigo-400">⚡ Shodh-a-Code</h1>
      <div className="flex gap-6 text-sm font-medium">
        <Link to="/" className="hover:text-indigo-400 transition">Home</Link>
        <a href="https://github.com/" target="_blank" className="hover:text-indigo-400 transition">GitHub</a>
      </div>
    </nav>
  );
}
