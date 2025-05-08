const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

// Rota para obter os dados da dashboard em JSON
router.get("/api/dashboard", dashboardController.getDashboardData);

module.exports = router;
