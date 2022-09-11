require("dotenv").config();
const supabase = require("@supabase/supabase-js");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const client = supabase.createClient(supabaseUrl, supabaseAnonKey);
console.log(client);

const updates = client
  .from("profiles")
  .on("UPDATE", (payload) => {
    const {
      new: { id, coord_x },
    } = payload;
    console.log("Change received!", id, coord_x);
  })
  .subscribe();
