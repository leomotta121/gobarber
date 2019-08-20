const express = require("express");
const bodyParser = require("body-parser");
const env = require("./helper/env");
const routes = require("./routes");
const ApiError = require("./helper/apiError");
const counter = require("./middlewares/counter");

const server = express();

server.use(counter);
server.use(bodyParser.json());

server.use(routes);

// Catch 404
server.use((req, res, next) => {
  const error = new ApiError("Not found", 404, "Route not found.");
  next(error);
});

// Catch errors
server.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const name = error.name;
  const message = error.message;
  res.status(status).json({ name, message, status });
});

server.listen(env.PORT, () => {
  console.log(`Listening on port ${env.PORT}`);
});
