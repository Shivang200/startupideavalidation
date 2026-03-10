import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PostIdea() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
    <div className="min-h-screen bg-black text-white flex justify-center">

      <div className="w-full max-w-2xl p-6">

        <h1 className="text-3xl font-bold mb-6">
          Post Your Idea
        </h1>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded">

          <input
            type="text"
            placeholder="Idea title"
            className="w-full bg-black border border-zinc-700 p-3 rounded mb-4 outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Describe your startup idea..."
            rows="5"
            className="w-full bg-black border border-zinc-700 p-3 rounded mb-4 outline-none resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            onClick={handlePost}
            className="bg-white text-black px-4 py-2 rounded w-full hover:bg-gray-200"
          >
            Publish Idea
          </button>

        </div>

      </div>

    </div>
  );
}

export default PostIdea;