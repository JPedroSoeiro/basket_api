const express = require("express");
const cors = require("cors");
const app = express();
const teams = require("../dados/teams.json");
const players = require("../dados/players.json");

app.use(cors());
app.use(express.json());

app.get("/api/teams", (req, res) => {
  res.json(teams);
});

app.get("/api/players", (req, res) => {
  res.json(players);
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
