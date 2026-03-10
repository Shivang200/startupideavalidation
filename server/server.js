require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const ideaRoutes = require("./routes/idea");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/ideas", ideaRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
})
.catch(err => console.log(err));