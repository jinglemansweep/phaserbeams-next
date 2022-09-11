import React, { useState, useEffect } from "react";
import { supabase, getCurrentUser } from "../utils/supabase";
import { Session } from "@supabase/gotrue-js";
import styles from "../styles/Home.module.css";

export default function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [coordX, setCoordX] = useState<number | null>(null);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      setLoading(true);
      const user = await getCurrentUser();
      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, coord_x`)
        .eq("id", user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setUsername(data.username);
        setCoordX(data.coord_x);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async ({
    username,
    coordX,
  }: Record<string, unknown>) => {
    try {
      setLoading(true);
      const user = await getCurrentUser();
      const updates = {
        id: user.id,
        username,
        coord_x: coordX,
        updated_at: new Date(),
      };
      let { error } = await supabase.from("profiles").upsert(updates);
      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Profile</h1>
        <div className={styles.fieldrow}>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" value={session.user?.email} disabled />
        </div>
        <div className={styles.fieldrow}>
          <label htmlFor="username">Name</label>
          <input
            id="username"
            type="text"
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.fieldrow}>
          <label htmlFor="coordX">X Coordinate</label>
          <input
            id="coord_x"
            type="number"
            value={coordX || ""}
            onChange={(e) => setCoordX(parseInt(e.target.value))}
          />
        </div>
        <div className={styles.actionrow}>
          <button
            className="button primary block"
            onClick={() => updateProfile({ username, coordX })}
            disabled={loading}
          >
            {loading ? "Loading ..." : "Update"}
          </button>
          <button
            className="button block"
            onClick={() => supabase.auth.signOut()}
          >
            Sign Out
          </button>
        </div>
      </main>
    </div>
  );
}
