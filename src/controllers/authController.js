const { authenticateUser } = require("../models/authModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { token, user } = await authenticateUser(email, password);

    console.log("Token gerado:", token);
    console.log(
      "JWT_SECRET_KEY (login):",
      JSON.stringify(process.env.JWT_SECRET_KEY)
    );

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
  const token = req.headers["authorization"];

  console.log("Authorization Header:", token);
  console.log(
    "JWT_SECRET_KEY (verify):",
    JSON.stringify(process.env.JWT_SECRET_KEY)
  );

  if (!token || !token.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Token não fornecido ou mal formatado" });
  }

  const tokenWithoutBearer = token.split(" ")[1];

  jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log("Erro ao verificar token:", err.message);
      return res.status(401).json({ message: "Token inválido" });
    }

    res.json({ message: "Token válido", userId: decoded.userId });
  });
};

module.exports = {
  loginController,
  verifyToken,
};
