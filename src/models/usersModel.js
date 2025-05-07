const supabase = require("../config/supabaseClient");

// GET all Users
const getAllUsers = async () => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) throw error;
  return data;
};

// GET one Users
const getOneUser = async (id) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
};

// CREATE new Users
const createUser = async (player) => {
  // Verificar se o email já está cadastrado
  const { data: existingUser, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", player.email)
    .single();

  if (existingUser) {
    throw new Error("O e-mail fornecido já está em uso.");
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

  if (createError) throw createError;
  return data;
};

// UPDATE Users
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
      .single();

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
    .single();

  if (error) throw error;
  return data;
};

// DELETE Users
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
