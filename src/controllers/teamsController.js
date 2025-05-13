const supabase = require("../config/supabaseClient");

const getAllTeams = async (req, res) => {
  try {
    const { data, error } = await supabase.from("teams").select("*");
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error("Erro ao buscar times:", error);
    res.status(500).json({ message: "Erro ao buscar times" });
  }
};

const getTeamById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("teams")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error("Erro ao buscar time:", error);
    res.status(500).json({ message: "Erro ao buscar time" });
  }
};

const updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const { data, error } = await supabase
      .from("teams")
      .update(updatedData)
      .eq("id", id);
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error("Erro ao atualizar time:", error);
    res.status(500).json({ message: "Erro ao atualizar time" });
  }
};

const insertTeam = async (req, res) => {
  try {
    const newTeam = req.body;
    const { data, error } = await supabase
      .from("teams")
      .insert([newTeam])
      .select()
      .single();
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error("Erro ao inserir time:", error);
    res.status(500).json({ message: "Erro ao inserir time" });
  }
};

const deleteTeamById = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from("teams").delete().eq("id", id);
    if (error) throw error;
    res.json({ message: "Time deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir time:", error);
    res.status(500).json({ message: "Erro ao excluir time" });
  }
};

module.exports = {
  getAllTeams,
  getTeamById,
  updateTeam,
  insertTeam,
  deleteTeamById,
};
