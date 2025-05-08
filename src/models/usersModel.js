const supabase = require("../config/supabaseClient");
const bcrypt = require("bcryptjs");

// GET all Users
const getAllUsers = async () => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) throw error;
  return data.map((user) => {
    delete user.password; // Remover a senha de todos os usuários
    return user;
  });
};

// GET one User
const getOneUser = async (id) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  delete data.password; // Remover a senha antes de retornar
  return data;
};

// CREATE new User
const createUser = async (player) => {
  // Verificar se o email já está cadastrado
  const { data: existingUser, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", player.email)
    .single();

  // Se o e-mail já estiver em uso, trocamos a mensagem de erro
  if (existingUser) {
    throw new Error("Por favor, escolha outro e-mail."); //
  }

  if (error) {
    // Se houver outro erro no processo de consulta, lançar um erro geral
    throw new Error("Erro ao verificar e-mail.");
  }

  // Criptografar a senha antes de salvar no banco
  const hashedPassword = await bcrypt.hash(player.password, 10);
  player.password = hashedPassword; // Atualiza o campo de senha com a versão criptografada

  // Criar o usuário
  const { data, error: createError } = await supabase
    .from("users")
    .insert([player])
    .select()
    .single();

  if (createError) {
    // Se houver um erro ao criar o usuário, lançar uma mensagem apropriada
    throw new Error("Erro ao criar o usuário.");
  }

  delete data.password; // Remover a senha antes de retornar os dados
  return data;
};

// UPDATE User
const updateUser = async (id, updates) => {
  // Verificar se a senha foi incluída nas atualizações
  if (updates.password) {
    // Criptografar a nova senha
    const hashedPassword = await bcrypt.hash(updates.password, 10);
    updates.password = hashedPassword; // Atualiza o campo de senha com a versão criptografada
  }

  // Verificar se o e-mail foi alterado
  if (updates.email) {
    // Consultar se o e-mail fornecido já está em uso por outro usuário (excluindo o próprio usuário)
    const { data: existingUser, error: emailError } = await supabase
      .from("users")
      .select("*")
      .eq("email", updates.email)
      .neq("id", id) // Excluir o próprio usuário da verificação
      .maybeSingle(); // Usa maybeSingle() para não lançar erro se não encontrar o usuário

    if (existingUser) {
      throw new Error("O e-mail fornecido já está em uso.");
    }
    if (emailError) throw emailError;
  }

  // Realizar a atualização no banco de dados
  const { data, error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", id)
    .select()
    .maybeSingle(); // Usa maybeSingle() para não lançar erro se não encontrar o usuário

  if (error) throw error;

  if (!data) {
    throw new Error("Usuário não encontrado");
  }

  // Remover o campo de senha da resposta antes de retorná-la
  delete data.password;

  return data;
};

// DELETE User
const deleteUser = async (id) => {
  const { error } = await supabase.from("users").delete().eq("id", id);
  if (error) throw error;
  return { message: "Usuário deletado com sucesso" };
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
