const {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../models/usersModel");

// Listar todos os usuários
const listUsersController = async (req, res) => {
  try {
    const players = await getAllUsers();
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter um usuário específico
const getUserByIdController = async (req, res) => {
  try {
    const player = await getOneUser(req.params.id);
    if (!player) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.json(player);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Criar um novo usuario
const addUserController = async (req, res) => {
  try {
    const playerData = req.body;
    const newPlayer = await createUser(playerData);
    res.status(201).json(newPlayer); // 201 Created
  } catch (error) {
    if (error.message === "Por favor, escolha outro e-mail.") {
      // Se o erro for de e-mail já existente, retorna o status 409 Conflict
      res.status(409).json({ error: error.message });
    } else {
      // Para outros erros, podemos continuar retornando o 500 Internal Server Error
      res.status(500).json({ error: error.message });
    }
  }
};

// Atualizar um usuario existente
const updateUserController = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;

    const updatedUser = await updateUser(id, updates);

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Deletar um usuário
const deleteUserByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteUser(id);
    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listUsersController,
  getUserByIdController,
  addUserController,
  updateUserController,
  deleteUserByIdController,
};
