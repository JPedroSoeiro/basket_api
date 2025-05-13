const { authenticateUser } = require("../models/authModel");
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

module.exports = {
  loginController,
};
