const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const supabase = require("../config/supabaseClient");
const dotenv = require("dotenv");
dotenv.config();

const authenticateUser = async (email, password) => {
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user) {
    throw new Error("Usuário não encontrado");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Senha inválida");
  }

  const { data: updatedUser, error: updateError } = await supabase
    .from("users")
    .update({
      login_count: (user.login_count || 0) + 1,
      last_login: new Date().toISOString(),
    })
    .eq("id", user.id)
    .select("*")
    .single();

  if (updateError || !updatedUser) {
    throw new Error("Erro ao atualizar informações de login");
  }

  delete updatedUser.password;

  console.log(
    "JWT_SECRET_KEY (sign):",
    JSON.stringify(process.env.JWT_SECRET_KEY)
  );

  const token = jwt.sign(
    { userId: updatedUser.id },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );

  console.log("Token gerado (sign):", token);

  return { message: "Login bem-sucedido", token, user: updatedUser };
};

module.exports = {
  authenticateUser,
};
