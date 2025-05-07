const express = require("express");
const cors = require("cors");
const routes = require("../src/routes/playersRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(dashboardRoutes);
app.use(authRoutes);
app.use(routes);

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
