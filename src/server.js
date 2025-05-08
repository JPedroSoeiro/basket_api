require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes/playersRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const authRoutes = require("./routes/authRoutes");
const teamsRoutes = require("./routes/teamsRoutes");
const usersRoutes = require("./routes/usersRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(dashboardRoutes);
app.use(authRoutes);
app.use(usersRoutes);
app.use(routes); // playersRoutes
app.use(teamsRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
