const express = require("express");
const router = express.Router();
const { loginController, verifyToken } = require("../controllers/authController");

// Rota de login
router.post("/api/login", loginController);
router.get("/api/verify-token", verifyToken);

module.exports = router;
