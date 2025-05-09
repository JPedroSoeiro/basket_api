const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const supabase = require("../config/supabaseClient");
const dotenv = require("dotenv");
dotenv.config(); // Carregar variáveis de ambiente

// Função para autenticar o usuário e gerar o JWT
const authenticateUser = async (email, password) => {
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user) {
    throw new Error("Usuário não encontrado");
  }

  // Comparar a senha fornecida com a senha armazenada
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Senha inválida");
  }

  // Remover a senha antes de enviar para o frontend
  delete user.password;

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });

  return { message: "Login bem-sucedido", token, user };
};

module.exports = {
  authenticateUser,
};
