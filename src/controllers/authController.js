const { authenticateUser } = require("../models/authModel");
const { getOneUser }= require('../models/usersModel');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();


const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { token, user } = await authenticateUser(email, password);

    res.json({
      message: "Login bem-sucedido",
      token,
      user,
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const verifyToken = async (req, res) => {
  const token = req.headers["authorization"];

  if (!token || !token.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Token não fornecido ou mal formatado" });
  }

  const tokenWithoutBearer = token.split(" ")[1];

  try {
    // Verifica o token
    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET_KEY);
    
    // Obtém os dados do usuário através do Model
    const user = await getOneUser(decoded.userId);

    res.json({ 
      message: "Token válido",
      user
    });
  } catch (err) {
    console.log("Erro ao verificar token:", err.message);
    
    const statusCode = err.message === "Usuário não encontrado" ? 404 : 401;
    return res.status(statusCode).json({ message: err.message });
  }
};

module.exports = {
  loginController,
  verifyToken,
};
