const express = require("express");
const routeProjects = require("./routes/routeProjects");
const routeActions = require("./routes/routeActions");

const server = express();
server.use(express.json());
server.use("/api/projects", routeProjects);
server.use("/api/actions", routeActions);

server.get("/", (req, res) => {
  res.send(`<h2>sprint challenge</h2>`);
});

module.exports = server;