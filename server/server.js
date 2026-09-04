const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const captionRoutes = require("./routes/captionRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/captions", captionRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "CaptionMate API is running!"
  });
});


mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000
  })
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
/*mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });*/