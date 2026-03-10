import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="bg-black border-b border-zinc-800 text-white">
      <div className="max-w-5xl mx-auto flex justify-between items-center p-4">

        <h1 className="text-xl font-bold">
          IdeaPulse
        </h1>

        <div className="flex gap-6 text-sm">

          <Link to="/" className="hover:text-gray-400">
            Home
          </Link>

          <Link to="/my-ideas" className="hover:text-gray-400">
            My Ideas
          </Link>

          <Link
            to="/post"
            className="bg-white text-black px-3 py-1 rounded"
          >
            Post Idea
          </Link>

        </div>

      </div>
    </div>
  );
}

export default Navbar;