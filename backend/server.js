require("dotenv").config();
const express = require("express");

// initialize express
const app = express();

// middleware functions
app.use(express.json());

app.listen(process.env.PORT, () =>
  console.log(`Server running and listening on PORT ${process.env.PORT}`)
);
