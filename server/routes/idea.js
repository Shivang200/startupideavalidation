const express = require("express");
const router = express.Router();
const Idea = require("../models/ideas");
const verifyToken = require("../middleware/auth");

// POST new idea
router.post("/create", verifyToken, async (req, res) => {
  try {
    const { title, description } = req.body;

    const newIdea = new Idea({
      title,
      description,
      author: req.user.id,
    });

    await newIdea.save();

    res.status(201).json({ message: "Idea posted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// POST /vote/:id
router.post("/vote/:id", verifyToken, async (req, res) => {
  try {

    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }

    const userId = req.user.id;

    const alreadyVoted = idea.voters.includes(userId);

    if (alreadyVoted) {

      // UNVOTE
      idea.voters = idea.voters.filter(
        (voter) => voter.toString() !== userId
      );

      idea.votes -= 1;

      await idea.save();

      return res.json({
        message: "Vote removed",
        votes: idea.votes
      });

    } else {

      // ADD VOTE
      idea.voters.push(userId);
      idea.votes += 1;

      await idea.save();

      return res.json({
        message: "Vote added",
        votes: idea.votes
      });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/comment/:id", verifyToken, async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) return res.status(404).json({ message: "Idea not found" });

    const { text } = req.body;
    if (!text)
      return res.status(400).json({ message: "Comment cannot be empty" });

    // comments is an array inside your Idea model:
    // Initially, it’s empty [] for a new idea.
    idea.comments.push({
      user: req.user.id,
      text,
    });

    await idea.save();

    res.json({ message: "Comment added", commentsCount: idea.comments.length });
  } catch (err) {
    res.status(500).json(err);
  }
});

//to fetch all ideas with author info and comment count
router.get("/list", async (req, res) => {
  try {
    let sortOption = {};

    if (req.query.sort === "votes_desc") {
      sortOption = { votes: -1 };
    } else {
      sortOption = { createdAt: -1 };
    }

    const ideas = await Idea.find()
      .populate("author", "username")
      .sort(sortOption);

    const result = ideas.map((idea) => ({
      id: idea._id,
      title: idea.title,
      description: idea.description,
      votes: idea.votes,
      commentsCount: idea.comments.length,
      author: idea.author ? idea.author.username : "Anonymous"
    }));

    res.json(result);

  } catch (err) {
    console.log(err);   // IMPORTANT: see the real error in terminal
    res.status(500).json({ message: "Server error" });
  }
});

// GET single idea by ID with all comments
router.get("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id)
      .populate("author", "username")
      .populate("comments.user", "username");

    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }

    const result = {
      id: idea._id,
      title: idea.title,
      description: idea.description,
      votes: idea.votes,
      author: idea.author ? idea.author.username : "Anonymous",
      authorId: idea.author ? idea.author._id : null,
      createdAt: idea.createdAt,
      comments: idea.comments.map((c) => ({
        id: c._id,
        text: c.text,
        user: c.user ? c.user.username : "Anonymous",
        userId: c.user ? c.user._id : null,
        createdAt: c.createdAt
      }))
    };

    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
