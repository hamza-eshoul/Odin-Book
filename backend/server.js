require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const postsRoutes = require("./routes/posts");

// initialize app
const app = express();
app.use(cors());

// middleware functions
app.use(express.json({ limit: "50mb" }));

// routes
app.use("/users", userRoutes);
app.use("/posts", postsRoutes);

// connect to db
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () =>
      console.log(
        `Succesfully connected to MongoDB Atlas and listening on PORT ${process.env.PORT}`
      )
    );
  })
  .catch((err) => console.log(err));
