import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function PostIdea() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { theme, toggleTheme } = useTheme();

  const navigate = useNavigate();

  const handlePost = async () => {
    try {

      if (!title.trim() || !description.trim()) {
        alert("Please fill all fields");
        return;
      }

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/ideas/create",
        {
          title,
          description
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      navigate("/");

    } catch (error) {
      console.log(error);
      alert("Failed to post idea");
    }
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
          <button
            onClick={() => navigate("/")}
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hover:opacity-80 transition"
          >
            IdeaPulse
          </button>

          <div className="flex items-center gap-4">
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

            <button
              onClick={() => navigate("/")}
              className={`transition text-sm ${
                theme === "dark"
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Back to Feed
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Share Your Idea</h1>
          <p className={`text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Present your startup concept to the community for validation and feedback
          </p>
        </div>

        <div className={`p-8 rounded-lg border backdrop-blur-sm ${
          theme === "dark" 
            ? "bg-zinc-900/50 border-zinc-800" 
            : "bg-gray-100/50 border-gray-300"
        }`}>

          <div className="mb-6">
            <label className={`block text-sm font-semibold mb-3 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}>Idea Title</label>
            <input
              type="text"
              placeholder="e.g., AI-powered personal assistant for developers"
              className={`w-full p-4 rounded-lg outline-none border transition ${
                theme === "dark"
                  ? "bg-black/50 border-zinc-700 text-white placeholder-gray-600 focus:border-cyan-500"
                  : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-cyan-500"
              }`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-8">
            <label className={`block text-sm font-semibold mb-3 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}>Description</label>
            <textarea
              placeholder="Describe your startup idea in detail. Include the problem you're solving, your solution, and target market..."
              rows="8"
              className={`w-full p-4 rounded-lg outline-none resize-none border transition ${
                theme === "dark"
                  ? "bg-black/50 border-zinc-700 text-white placeholder-gray-600 focus:border-cyan-500"
                  : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-cyan-500"
              }`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button
            onClick={handlePost}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition font-semibold"
          >
            Publish Idea
          </button>

        </div>
      </div>
    </div>
  );
}

export default PostIdea;