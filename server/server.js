"use strict";
const path = require("path");
const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load(path.join(__dirname, "swagger.yaml"));
const mongoose = require("mongoose");
const api = require("./api/api");
const config = require("./config/config");
const logger = require("./util/logger");
const auth = require("./auth/routes");
const { verifyToken } = require("./auth/auth");
const redis = require("redis");
const redisURL = "redis://127.0.0.1:6379";
const client = redis.createClient(redisURL);
const singleton = require("./api/singletonModuleTest");

//#region ------------ Redis ---------
console.log(`${client.set("hi", "there")}`);
client.get("hi", (err, value) => {
  console.log(`value------>${value}`);
});

console.log(`Singleton i on server.js  = >> ${singleton.getCounter()}`);

const redisValues = {
  spanish: {
    red: "rojo",
    orange: "narjana",
    blue: "azul"
  },
  german: {
    red: "rot",
    orange: "orange",
    blue: "blau"
  }
};

console.table(redisValues);

Object.entries(redisValues).forEach(([Key, Value]) => {
  console.log(`${JSON.stringify(Value)}`);
});

console.time("ssss");
client.hset("german", "red", "rot");

client.hget("german", "red", console.log);

client.set("redisValues", JSON.stringify(redisValues));

client.get("redisValues", (err, val) => {
  console.log(`${JSON.parse(val).spanish.blue}`);
  console.timeEnd("ssss");
});

//#endregion

// db.url is different depending on NODE_ENV
mongoose.connect(config.db.url);

mongoose.connection.on(
  "error",
  logger.error.bind(console, "connection error:")
);
mongoose.connection.once("open", function callback() {
  logger.log("---------- Database connected..");
});

if (config.seed) {
  require("./util/seed");
}
// setup the app middlware
require("./middleware/appMiddlware")(app);

app.get("/health", function(req, res) {
  res.status(200).send("200 OK");
});

// // setup the api
// swagger definition
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.all("*", verifyToken());
app.use("/api/v1", api);
// app.use('/api', api);
// app.use('/auth', auth);
// set up global error handling

app.use(function(err, req, res, next) {
  // Log all errors
  logger.error(err);

  // if error thrown from jwt validation check
  if (err.name === "UnauthorizedError") {
    res.status(401).send("Invalid token");
    return;
  } else if (err.message === "Invalid Assignment ID supplied") {
    res.status(400).send(err.message);
  } else if (err.name === "MongoError") {
    if (err.status === 409) res.status(409).send(err.message);
    return;
  } else {
    res
      .status(500)
      .send("Sorry there seems to be system error, please contact developer!");
    return;
  }
});

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", { message: err.message, error: err });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});

// export the app for testing
module.exports = app;
