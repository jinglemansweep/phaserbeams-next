import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const loginUser = async (loadingState?: Function | null) => {
  try {
    if (loadingState) loadingState(true);
    const { error } = await supabase.auth.signIn({ provider: "github" });
    if (error) throw error;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  } finally {
    if (loadingState) loadingState(false);
  }
};

export const getUser = async () => {
  try {
    const user = await supabase.auth.user();
    if (!user) {
      throw new Error("No user session, not logged in!");
    }
    return user;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

export const getProfile = async (loadingState?: Function | null) => {
  try {
    if (loadingState) loadingState(true);
    const user = await getUser();
    let { data, error, status } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user?.id)
      .single();
    if (error && status !== 406) {
      throw error;
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  } finally {
    if (loadingState) loadingState(false);
  }
};

export const upsertProfile = async (
  updates: Record<string, unknown> = {},
  loadingState?: Function
) => {
  try {
    if (loadingState) loadingState(true);
    const user = await getUser();
    const profile = {
      id: user?.id,
      updated_at: new Date(),
      ...updates,
    };
    let { error } = await supabase.from("profiles").upsert(profile);
    if (error) {
      throw error;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  } finally {
    if (loadingState) loadingState(false);
  }
};

export const getGameState = async (loadingState?: Function | null) => {
  try {
    if (loadingState) loadingState(true);
    let { data, error, status } = await supabase
      .from("profiles")
      .select("id, coord_x");
    if (error && status !== 406) {
      throw error;
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  } finally {
    if (loadingState) loadingState(false);
  }
};
