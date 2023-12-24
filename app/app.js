const express = require("express");
const cors = require("cors");
const userRouter = require("../router/userRouter");
const app = express();

// use middleware to form contract for incoming json payloads ONLY!
app.use(express.json());
// use middleware for url encoding
app.use(express.urlencoded({ extended: true }));
// use middleware to handle cors policy
app.use(cors());

// health point or actuator
app.get("/", (req, res, next) => {
  res.status(200).json({ Message: "Service is up!" });
});

//routers
app.use("/users", userRouter);

// bad url or error
// handle with middlewares
app.use((req, res, next) => {
  const error = new Error("Not Found");

  error.status = 404;

  // pass the error to the next middleware
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
      status: error.status,
    },
  });
});

module.exports = app;
