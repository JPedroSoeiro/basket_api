const express = require("express");
const router = express.Router();
const {
  getAllTeams, // Corrigido de 'listTeams' para 'getAllTeams'
  getTeamById,
  insertTeam, // Corrigido de 'addTeam' para 'insertTeam'
  updateTeam, // Corrigido de 'updateTeamById' para 'updateTeam'
  deleteTeamById,
} = require("../controllers/teamsController");

// Rota para listar todos os times
router.get("/api/teams", getAllTeams); // Corrigido para 'getAllTeams'

// Rota para obter um time por ID
router.get("/api/teams/:id", getTeamById); // Rota correta

// Rota para criar um novo time
router.post("/api/teams/", insertTeam); // Corrigido para 'insertTeam'

// Rota para atualizar um time por ID
router.put("/api/teams/:id", updateTeam); // Corrigido para 'updateTeam'

// Rota para deletar um time por ID
router.delete("/api/teams/:id", deleteTeamById); // Rota correta

module.exports = router;
