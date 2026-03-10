import { Routes, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./context/ThemeContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PostIdea from "./pages/PostIdea.jsx";

import IdeaDetail from "./pages/IdeaDetail.jsx";


function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post" element={<PostIdea />} />
        {/* <Route path="/my-ideas" element={<MyIdeas />} /> */}
        <Route path="/idea/:id" element={<IdeaDetail />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;