const dashboardModel = require("../models/dashboardModel");

// Função para obter dados da dashboard (contagem de jogadores e equipes)
const getDashboardData = async (req, res) => {
  try {
    // Obter as contagens de jogadores e equipes
    const playerCount = await dashboardModel.getPlayerCount();
    const teamCount = await dashboardModel.getTeamCount();

    // Retornar os dados em formato JSON
    res.json({
      players: playerCount,
      teams: teamCount,
    });
  } catch (error) {
    console.error("Erro ao obter dados da dashboard:", error);
    res.status(500).json({ error: "Erro ao obter dados da dashboard" });
  }
};

module.exports = {
  getDashboardData,
};
