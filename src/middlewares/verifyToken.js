const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Token não fornecido" });
  }

  const tokenWithoutBearer = token.split(" ")[1];

  jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido" });
    }

    req.userId = decoded.userId; // Armazena o id do usuário decodificado para uso nas rotas
    next();
  });
};

module.exports = verifyToken;
