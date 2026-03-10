import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function IdeaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [idea, setIdea] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);
  const { theme, toggleTheme } = useTheme();

  const fetchIdea = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/ideas/${id}`);
      setIdea(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIdea();
  }, [id]);

  const handleVote = async () => {
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

      fetchIdea(); // refresh idea after vote

    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `http://localhost:5000/api/ideas/comment/${id}`,
        { text: commentText },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setCommentText(""); // clear input
      fetchIdea(); // refresh idea with new comment

    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        theme === "dark" 
          ? "bg-gradient-to-br from-black via-zinc-950 to-black text-white" 
          : "bg-gradient-to-br from-white via-gray-50 to-white text-gray-900"
      }`}>
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!idea) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        theme === "dark" 
          ? "bg-gradient-to-br from-black via-zinc-950 to-black text-white" 
          : "bg-gradient-to-br from-white via-gray-50 to-white text-gray-900"
      }`}>
        <div className="text-xl">Idea not found</div>
      </div>
    );
  }

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
              onClick={() => navigate("/")}
              className={`transition text-sm ${
                theme === "dark"
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Back to Feed
            </button>

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
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="flex gap-8">
          {/* Left Column - Idea Details & Reviews */}
          <div className="flex-1">
            {/* Idea Details */}
            <div className={`p-8 rounded-lg border backdrop-blur-sm mb-8 ${
              theme === "dark" 
                ? "bg-zinc-900/50 border-zinc-800" 
                : "bg-gray-100/50 border-gray-300"
            }`}>
              <h1 className="text-4xl font-bold mb-4">{idea.title}</h1>

              <p className={`text-lg mb-8 leading-relaxed ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}>{idea.description}</p>

              <div className={`flex justify-between items-center text-sm mb-6 flex-wrap gap-4 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
                <div className="flex gap-8">
                  <span className="flex items-center gap-2">⬆ <strong>{idea.votes}</strong> votes</span>
                  <span className="flex items-center gap-2">💬 <strong>{idea.comments.length}</strong> comments</span>
                  <span className="flex items-center gap-2">👤 <strong>{idea.author}</strong></span>
                </div>

                <button
                  onClick={handleVote}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition font-semibold whitespace-nowrap"
                >
                  ⬆ Upvote
                </button>
              </div>

              <div className={`text-sm ${
                theme === "dark" ? "text-gray-500" : "text-gray-600"
              }`}>
                Posted on {new Date(idea.createdAt).toLocaleDateString()}
              </div>
            </div>

            {/* Reviews & Comments List */}
            <div className={`p-8 rounded-lg border backdrop-blur-sm ${
              theme === "dark" 
                ? "bg-zinc-900/50 border-zinc-800" 
                : "bg-gray-100/50 border-gray-300"
            }`}>
              <h2 className="text-2xl font-bold mb-8">Community Reviews</h2>

              {/* Comments List */}
              <div className="space-y-4">
                {idea.comments.length === 0 ? (
                  <p className={`text-center py-12 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}>No comments yet. Be the first to share feedback!</p>
                ) : (
                  idea.comments.map((comment) => (
                    <div key={comment.id} className={`p-4 rounded-lg border ${
                      theme === "dark" 
                        ? "bg-black/50 border-zinc-700" 
                        : "bg-white/50 border-gray-300"
                    }`}>
                      <div className="flex justify-between items-start mb-3">
                        <span className="font-semibold text-blue-400">{comment.user}</span>
                        <span className={`text-xs ${
                          theme === "dark" ? "text-gray-500" : "text-gray-600"
                        }`}>
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>{comment.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Comment Form */}
          <div className="w-80">
            <div className={`p-8 rounded-lg border backdrop-blur-sm sticky top-24 ${
              theme === "dark" 
                ? "bg-zinc-900/50 border-zinc-800" 
                : "bg-gray-100/50 border-gray-300"
            }`}>
              <h3 className="text-xl font-bold mb-6">Share Your Feedback</h3>

              {/* Comment Form */}
              <form onSubmit={handleComment} className="space-y-4">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Share your thoughts and feedback..."
                  className={`w-full p-3 rounded-lg outline-none resize-none border transition ${
                    theme === "dark"
                      ? "bg-black/50 border-zinc-700 text-white placeholder-gray-600 focus:border-cyan-500"
                      : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-cyan-500"
                  }`}
                  rows="6"
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition font-semibold"
                >
                  Post Comment
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default IdeaDetail;
