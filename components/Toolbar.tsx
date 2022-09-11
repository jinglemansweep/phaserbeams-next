import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import { Session } from "@supabase/gotrue-js";
import styles from "../styles/Home.module.css";

export default function Toolbar({ session }: { session: Session }) {
  return (
    <div className={styles.toolbar}>
      <ul>
        <li>
          <a href="#" onClick={() => supabase.auth.signOut()}>
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
}
