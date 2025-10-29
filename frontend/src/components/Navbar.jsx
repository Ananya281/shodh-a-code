import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <Link to="/" className="text-2xl font-bold text-blue-400">
        Shodh-a-Code
      </Link>
      <div className="space-x-6">
        <Link to="/" className="hover:text-blue-300">Contests</Link>
        <Link to="/leaderboard" className="hover:text-blue-300">Leaderboard</Link>
      </div>
    </nav>
  );
};

export default Navbar;
