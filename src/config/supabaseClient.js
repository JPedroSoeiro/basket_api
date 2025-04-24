const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://upbbzpwciqxxaqbpsvib.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwYmJ6cHdjaXF4eGFxYnBzdmliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzNDg2NjYsImV4cCI6MjA2MDkyNDY2Nn0.geVk876wMg2M6afpYG1PqVvFclswLYZPbxJ3-ZlRqmc";

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
