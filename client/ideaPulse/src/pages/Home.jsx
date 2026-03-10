import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Home() {

  const [ideas, setIdeas] = useState([]);
  const [sortBy, setSortBy] = useState("latest");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    fetchIdeas(sortBy);
  }, []);

  const fetchIdeas = async (sort = "latest") => {
    try {
      let url = "http://localhost:5000/api/ideas/list";
      if (sort === "popular") {
        url += "?sort=votes_desc";
      }
      const res = await axios.get(url);
      setIdeas(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchIdeas(sortBy);
  }, [sortBy]);

  const handleVote = async (e, id) => {
    e.stopPropagation();
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `http://localhost:5000/api/ideas/vote/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchIdeas(sortBy); // refresh list after vote

    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  // Function to get avatar initials
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={`min-h-screen ${
      theme === "dark" 
        ? "bg-gradient-to-br from-black via-zinc-950 to-black text-white" 
        : "bg-gradient-to-br from-white via-gray-50 to-white text-gray-900"
    }`}>
      {/* Header/Navbar */}
      <nav className={`${
        theme === "dark"
          ? "bg-black/50 border-zinc-800"
          : "bg-white/50 border-gray-200"
      } backdrop-blur-sm border-b sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">IdeaPulse</h1>
            <p className={`text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>Test your startup idea before you build.</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition ${
                theme === "dark"
                  ? "bg-zinc-800 hover:bg-zinc-700 text-yellow-400"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800"
              }`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className={`transition text-sm ${
                    theme === "dark"
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-1.5 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition font-semibold text-sm text-white"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate("/post")}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-1.5 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition font-semibold text-sm text-white"
                >
                  + Post Idea
                </button>
                <button
                  onClick={handleLogout}
                  className={`transition text-sm ${
                    theme === "dark"
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-8 py-8">
        {/* Page Title and Sort Options */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Explore Ideas</h2>
            <p className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-600"}`}>Discover and validate the best startup ideas</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setSortBy("latest")}
              className={`px-4 py-2 rounded-lg transition font-semibold text-sm whitespace-nowrap ${
                sortBy === "latest"
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50"
                  : theme === "dark"
                  ? "bg-zinc-800/50 text-gray-400 hover:bg-zinc-700/50"
                  : "bg-gray-200/50 text-gray-600 hover:bg-gray-300/50"
              }`}
            >
              Latest
            </button>
            <button
              onClick={() => setSortBy("popular")}
              className={`px-4 py-2 rounded-lg transition font-semibold text-sm whitespace-nowrap ${
                sortBy === "popular"
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50"
                  : theme === "dark"
                  ? "bg-zinc-800/50 text-gray-400 hover:bg-zinc-700/50"
                  : "bg-gray-200/50 text-gray-600 hover:bg-gray-300/50"
              }`}
            >
              Popular
            </button>
          </div>
        </div>

        {/* Ideas List */}
        <div className="space-y-2">

          {ideas.map((idea) => (
            <div
              key={idea.id}
              onClick={() => navigate(`/idea/${idea.id}`)}
              className={`group px-6 py-4 rounded-lg cursor-pointer transition duration-300 flex items-center gap-4 ${
                theme === "dark"
                  ? "bg-gradient-to-br from-zinc-800/30 to-zinc-900/30 border border-zinc-700/30 hover:border-cyan-500/50 hover:bg-gradient-to-br hover:from-zinc-800/50 hover:to-zinc-900/50 hover:shadow-xl hover:shadow-cyan-500/10"
                  : "bg-gradient-to-br from-gray-200/30 to-gray-300/30 border border-gray-300/30 hover:border-cyan-500/50 hover:bg-gradient-to-br hover:from-gray-200/50 hover:to-gray-300/50 hover:shadow-xl hover:shadow-cyan-500/10"
              } backdrop-blur-sm`}
            >
              {/* Avatar */}
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center font-bold text-sm text-white">
                {getInitials(idea.author)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className={`text-sm font-semibold group-hover:text-cyan-400 transition truncate ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                  {idea.title}
                </h3>
                <p className={`text-xs mt-1 truncate ${
                  theme === "dark" ? "text-gray-500" : "text-gray-600"
                }`}>
                  by {idea.author}
                </p>
                <p className={`text-sm mt-2 line-clamp-1 ${
                  theme === "dark" ? "text-gray-600" : "text-gray-700"
                }`}>
                  {idea.description}
                </p>
              </div>

              {/* Metrics and Actions */}
              <div className="flex-shrink-0 flex items-center gap-4 ml-4">
                <div className="text-right">
                  <div className={`flex items-center justify-end gap-4 text-xs ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}>
                    <span className="flex items-center gap-1">
                      <span className="text-sm">⬆</span> {idea.votes}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-sm">💬</span> {idea.commentsCount}
                    </span>
                  </div>
                </div>

                <button
                  onClick={(e) => handleVote(e, idea.id)}
                  className="flex-shrink-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/40 hover:to-cyan-500/40 border border-blue-500/30 hover:border-cyan-500/50 text-xs px-3 py-1.5 rounded-lg transition font-semibold text-blue-500"
                >
                  Vote
                </button>
              </div>

            </div>
          ))}

        </div>

        {ideas.length === 0 && (
          <div className={`text-center py-16 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            <p className="text-lg">No ideas yet. Be the first to post one!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;