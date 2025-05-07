const express = require("express");
const router = express.Router();
const {
  listTeams,
  getTeamById,
  addTeam,
  updateTeamById,
  deleteTeamById,
} = require("../controllers/teamsController");

router.get("/api/teams", listTeams); // Listar todos os times
router.get("/api/teams/:id", getTeamById); // Obter um time por ID
router.post("/api/teams/", addTeam); // Criar um novo time
router.put("/api/teams/:id", updateTeamById); // Atualizar um time por ID
router.delete("/api/teams/:id", deleteTeamById); // Deletar um time por ID

module.exports = router;
