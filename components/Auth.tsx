import React from "react";
import { useState } from "react";
import Image from "next/image";
import { supabase } from "../utils/supabaseClient";
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
      alert(error.error_description || error.message);
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
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            width="100"
            height="20"
            className={styles.logo}
          />
        </a>
      </footer>
    </div>
  );
}
