import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "../App.css";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { theme, toggleTheme } = useTheme();

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      });

      alert(res.data.message);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
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
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">
              Create Account
            </h1>
            <p className={`text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Join our community and share your ideas
            </p>
          </div>

          <div className={`p-8 rounded-lg border backdrop-blur-sm ${
            theme === "dark" 
              ? "bg-zinc-900/50 border-zinc-800" 
              : "bg-gray-100/50 border-gray-300"
          }`}>
            {/* Username */}
            <div className="mb-6">
              <label className={`block text-sm font-semibold mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Username</label>
              <input
                type="text"
                placeholder="yourname"
                className={`w-full p-3 rounded-lg outline-none border transition ${
                  theme === "dark"
                    ? "bg-black/50 border-zinc-700 text-white placeholder-gray-600 focus:border-cyan-500"
                    : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-cyan-500"
                }`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="mb-6">
              <label className={`block text-sm font-semibold mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className={`w-full p-3 rounded-lg outline-none border transition ${
                  theme === "dark"
                    ? "bg-black/50 border-zinc-700 text-white placeholder-gray-600 focus:border-cyan-500"
                    : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-cyan-500"
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="mb-8">
              <label className={`block text-sm font-semibold mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className={`w-full p-3 rounded-lg outline-none border transition ${
                  theme === "dark"
                    ? "bg-black/50 border-zinc-700 text-white placeholder-gray-600 focus:border-cyan-500"
                    : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-cyan-500"
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Register Button */}
            <button
              onClick={handleRegister}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition mb-4"
            >
              Create Account
            </button>

            {/* Login Link */}
            <p className={`text-center text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-400 hover:text-blue-300 underline font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
