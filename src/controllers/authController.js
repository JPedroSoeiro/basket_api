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

const verifyToken = (req, res) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  // O token geralmente vem no formato 'Bearer <token>', então você pode querer extrair apenas a parte do token
  const tokenWithoutBearer = token.split(' ')[1];

  jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET_KEY, (err, decoded) => {
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
