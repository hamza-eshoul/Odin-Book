require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const postsRoutes = require("./routes/post");
const fakeUser = require("./seeds");

// initialize app
const app = express();
app.use(cors());

// middleware functions
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/user", userRoutes);
app.use("/post", postsRoutes);

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

fakeUser();
