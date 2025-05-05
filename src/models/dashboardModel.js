const supabase = require("../config/supabaseClient");

const getPlayerCount = async () => {
  try {
    const { data, error } = await supabase
      .from("players")
      .select("id", { count: "exact" });

    if (error) {
      console.error("Erro ao contar jogadores:", error);
      throw error;
    }
    return data.length;
  } catch (err) {
    console.error("Erro no getPlayerCount:", err);
    throw err;
  }
};

const getTeamCount = async () => {
  try {
    const { data, error } = await supabase
      .from("teams")
      .select("id", { count: "exact" });

    if (error) {
      console.error("Erro ao contar equipes:", error);
      throw error;
    }
    return data.length;
  } catch (err) {
    console.error("Erro no getTeamCount:", err);
    throw err;
  }
};

module.exports = {
  getPlayerCount,
  getTeamCount,
};
