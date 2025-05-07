const { authenticateUser } = require("../models/authModel");

// Controlador de login
const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Autenticar o usuário
    const { token, user } = await authenticateUser(email, password);

    // Retornar o token e os dados do usuário
    res.json({
      message: "Login bem-sucedido",
      token,
      user,
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = {
  loginController,
};
