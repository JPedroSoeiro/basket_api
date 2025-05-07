const {
  getAllTeams,
  getOneTeam,
  createTeam,
  updateTeam,
  deleteTeam,
} = require("../models/teamsModel");

// Listar todos os times
const listTeams = async (req, res) => {
  try {
    const teams = await getAllTeams();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter um time específico
const getTeamById = async (req, res) => {
  try {
    const team = await getOneTeam(req.params.id);
    if (!team) {
      return res.status(404).json({ message: "Time não encontrado" });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Criar um novo time
const addTeam = async (req, res) => {
  try {
    const teamData = req.body;
    const newTeam = await createTeam(teamData);
    res.status(201).json(newTeam);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar um time existente
const updateTeamById = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const updatedTeam = await updateTeam(id, updates);

    if (!updatedTeam) {
      return res.status(404).json({ message: "Time não encontrado" });
    }

    res.json(updatedTeam);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Deletar um time
const deleteTeamById = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteTeam(id);
    res.status(200).json({ message: "Time deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listTeams,
  getTeamById,
  addTeam,
  updateTeamById,
  deleteTeamById,
};
