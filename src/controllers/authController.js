const { authenticateUser } = require("../models/authModel");
const jwt = require('jsonwebtoken'); 

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

const verifyToken = (req, res) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  // O token geralmente vem no formato 'Bearer <token>', então você pode querer extrair apenas a parte do token
  const tokenWithoutBearer = token.split(' ')[1];

  jwt.verify(tokenWithoutBearer, 'secretaChave', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    res.json({ message: 'Token válido', userId: decoded.userId });
  });
};

module.exports = {
  loginController,
  verifyToken
};
