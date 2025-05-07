const express = require("express");
const router = express.Router();
const {
  listUsersController,
  getUserByIdController,
  addUserController,
  updateUserController,
  deleteUserByIdController,
} = require("../controllers/usersController");

router.get("/api/users", listUsersController); // Listar todos os jogadores
router.get("/api/users/:id", getUserByIdController); // Obter um jogador por ID
router.post("/api/users/", addUserController); // Criar um novo jogador
router.put("/api/users/:id", updateUserController); // Atualizar um jogador por ID
router.delete("/api/users/:id", deleteUserByIdController); // Deletar um jogador por ID

module.exports = router;