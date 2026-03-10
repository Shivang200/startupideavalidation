import { Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PostIdea from "./pages/PostIdea.jsx";
import MyIdeas from "./pages/MyIdeas.jsx";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Routes>
    <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/post" element={<PostIdea />} />
<Route path="/my-ideas" element={<MyIdeas />} />
    </Routes>
  );
}

export default App;