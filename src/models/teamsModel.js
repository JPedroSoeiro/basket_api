const supabase = require("../config/supabaseClient");

// GET all teams
const getAllTeams = async () => {
  const { data, error } = await supabase.from("teams").select("*");
  if (error) throw error;
  return data;
};

// GET one team
const getOneTeam = async (id) => {
  const { data, error } = await supabase
    .from("teams")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
};

// CREATE new team
const createTeam = async (team) => {
  const { data, error } = await supabase
    .from("teams")
    .insert([team])
    .select()
    .single();
  if (error) throw error;
  return data;
};

// UPDATE team
const updateTeam = async (id, updates) => {
  const { data, error } = await supabase
    .from("teams")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

// DELETE team
const deleteTeam = async (id) => {
  const { error } = await supabase.from("teams").delete().eq("id", id);
  if (error) throw error;
  return { message: "Time deletado com sucesso" };
};

module.exports = {
  getAllTeams,
  getOneTeam,
  createTeam,
  updateTeam,
  deleteTeam,
};
