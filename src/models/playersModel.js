const supabase = require("../config/supabaseClient");

// GET all players
const getAllPlayers = async () => {
  const { data, error } = await supabase.from("players").select("*");
  if (error) throw error;
  return data;
};

// GET one player
const getOnePlayer = async (id) => {
  const { data, error } = await supabase
    .from("players")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
};

// CREATE new player
const createPlayer = async (player) => {
  const { data, error } = await supabase
    .from("players")
    .insert([player])
    .select()
    .single();
  if (error) throw error;
  return data;
};

// UPDATE player
const updatePlayer = async (id, updates) => {
  const { data, error } = await supabase
    .from("players")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

// DELETE player
const deletePlayer = async (id) => {
  const { error } = await supabase.from("players").delete().eq("id", id);
  if (error) throw error;
  return { message: "Jogador deletado com sucesso" };
};

module.exports = {
  getAllPlayers,
  getOnePlayer,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
