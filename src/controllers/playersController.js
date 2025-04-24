const {
  getAllPlayers,
  getOnePlayer,
  createPlayer,
  updatePlayer,
  deletePlayer,
} = require("../models/playersModel");

// Listar todos os jogadores
const listPlayers = async (req, res) => {
  try {
    const players = await getAllPlayers();
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter um jogador específico
const getPlayerById = async (req, res) => {
  try {
    const player = await getOnePlayer(req.params.id);
    if (!player) {
      return res.status(404).json({ message: "Jogador não encontrado" });
    }
    res.json(player);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Criar um novo jogador
const addPlayer = async (req, res) => {
  try {
    const playerData = req.body;
    const newPlayer = await createPlayer(playerData);
    res.status(201).json(newPlayer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar um jogador existente
const updatePlayerById = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const updatedPlayer = await updatePlayer(id, updates);

    if (!updatedPlayer) {
      return res.status(404).json({ message: "Jogador não encontrado" });
    }

    res.json(updatedPlayer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Deletar um jogador
const deletePlayerById = async (req, res) => {
  try {
    const id = req.params.id;
    await deletePlayer(id);
    res.status(200).json({ message: "Jogador deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listPlayers,
  getPlayerById,
  addPlayer,
  updatePlayerById,
  deletePlayerById,
};
