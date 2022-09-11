import React from "react";
import { useState } from "react";
import { supabase, getUser, loginUser } from "../utils/supabase";
import styles from "../styles/Home.module.css";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>PhaserBeams</h1>
        <div className={styles.actionrow}>
          <button
            onClick={(e) => {
              e.preventDefault();
              loginUser(setLoading);
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
