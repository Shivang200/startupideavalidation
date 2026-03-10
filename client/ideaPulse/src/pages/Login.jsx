import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const token = res.data.token;

      localStorage.setItem("token", token);

      alert("Login successful");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md p-8">
        <h1 className="text-2xl font-semibold text-center mb-2">
          Welcome to IdeaPulse
        </h1>

        <p className="text-center text-gray-400 mb-6">
          Don’t have an account?{" "}
          <Link to="/register" className="underline">
            Sign up
          </Link>
        </p>

        {/* Email */}
        <label className="text-sm text-gray-400">Email</label>
        <input
          type="email"
          placeholder="m@example.com"
          className="w-full mt-1 mb-4 p-3 rounded bg-zinc-900 border border-zinc-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <label className="text-sm text-gray-400">Password</label>
        <input
          type="password"
          className="w-full mt-1 mb-4 p-3 rounded bg-zinc-900 border border-zinc-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-gray-200 text-black py-3 rounded font-medium hover:bg-gray-300"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
