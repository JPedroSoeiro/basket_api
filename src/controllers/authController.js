const { authenticateUser } = require("../models/authModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config(); // Carregar variáveis de ambiente

// Controlador de login
const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Autenticar o usuário - O Supabase será acessado no backend
    const { token, user } = await authenticateUser(email, password);

    // Retornar o token JWT e os dados do usuário
    res.json({
      message: "Login bem-sucedido",
      token, // Envia o token JWT de volta para o frontend
      user, // Envia os dados do usuário (sem a senha)
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = {
  loginController,
};
