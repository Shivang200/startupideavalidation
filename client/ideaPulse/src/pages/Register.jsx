import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import "../App.css";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md p-8">
        <h1 className="text-2xl font-semibold text-center mb-2">
          Create an account
        </h1>

        <p className="text-center text-gray-400 mb-6">
          Already have an account?
          <Link to="/login" className="underline ml-1">
            Login
          </Link>
        </p>

        {/* Username */}
        <label className="text-sm text-gray-400">Username</label>
        <input
          type="text"
          placeholder="shivang"
          className="w-full mt-1 mb-4 p-3 rounded bg-zinc-900 border border-zinc-700"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

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

        {/* Register Button */}
        <button
          onClick={handleRegister}
          className="w-full bg-gray-200 text-black py-3 rounded font-medium hover:bg-gray-300"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
