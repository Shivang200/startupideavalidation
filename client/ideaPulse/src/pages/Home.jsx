import axios from "axios";
import { useState, useEffect } from "react";

function Home() {

  const [ideas, setIdeas] = useState([]);

  const fetchIdeas = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/ideas/list");
      setIdeas(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  const handleVote = async (id) => {
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

      fetchIdeas(); // refresh list after vote

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center">

      <div className="w-full max-w-2xl p-6">

        <h1 className="text-3xl font-bold mb-6">
          IdeaPulse
        </h1>

        <div className="space-y-4">

          {ideas.map((idea) => (
            <div
              key={idea.id}
              className="bg-zinc-900 p-4 rounded border border-zinc-800"
            >

              <h2 className="text-lg font-semibold">
                {idea.title}
              </h2>

              <p className="text-gray-400 mt-2">
                {idea.description}
              </p>

              <div className="flex justify-between items-center mt-3 text-sm text-gray-400">

                <div className="flex gap-6">
                  <span>⬆ {idea.votes} votes</span>
                  <span>💬 {idea.commentsCount} comments</span>
                  <span>👤 {idea.author}</span>
                </div>

                <button
                  onClick={() => handleVote(idea.id)}
                  className="bg-zinc-800 px-3 py-1 rounded hover:bg-zinc-700"
                >
                  ⬆ Upvote
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Home;