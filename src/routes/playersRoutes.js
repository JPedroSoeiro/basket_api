const express = require("express");
const router = express.Router();
const {
  listPlayers,
  getPlayerById,
  addPlayer,
  updatePlayerById,
  deletePlayerById,
} = require("../controllers/playersController");

router.get("/api/players", listPlayers); // Listar todos os jogadores
router.get("/api/players/:id", getPlayerById); // Obter um jogador por ID
router.post("/api/players/", addPlayer); // Criar um novo jogador
router.put("/api/players/:id", updatePlayerById); // Atualizar um jogador por ID
router.delete("/api/players/:id", deletePlayerById); // Deletar um jogador por ID

module.exports = router;