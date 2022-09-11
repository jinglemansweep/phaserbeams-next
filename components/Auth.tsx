import React from "react";
import { useState } from "react";
import { supabase, getCurrentUser } from "../utils/supabase";
import styles from "../styles/Home.module.css";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ provider: "github" });
      if (error) throw error;
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
        <h1 className={styles.title}>PhaserBeams</h1>
        <div className={styles.actionrow}>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="button block"
            disabled={loading}
          >
            <span>{loading ? "Loading" : "Login with GitHub"}</span>
          </button>
        </div>
      </main>
    </div>
  );
}
