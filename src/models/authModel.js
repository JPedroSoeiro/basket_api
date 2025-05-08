const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const supabase = require("../config/supabaseClient");

// Verificar se o usuário existe e validar a senha
const authenticateUser = async (email, password) => {
  // Buscar usuário pelo email
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user) {
    throw new Error("Usuário não encontrado");
  }

  // Comparar a senha fornecida com a senha armazenada (com bcrypt)
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Senha inválida");
  }

  // Remover o campo 'password' do usuário antes de retornar
  delete user.password;

  // Gerar o token JWT
  const token = jwt.sign({ userId: user.id }, "secretaChave", { expiresIn: "1h" });

  return { message: "Login bem-sucedido", token, user };
};

module.exports = {
  authenticateUser,
};
