import React, { useCallback, useState, useEffect } from "react";
import debounce from "lodash.debounce";
import Account from "./Account";
import Toolbar from "./Toolbar";
import { supabase, getCurrentUser } from "../utils/supabase";
import { Session } from "@supabase/gotrue-js";

import styles from "../styles/Home.module.css";

const KEY_LEFT = "o";
const KEY_RIGHT = "p";

export default function GameScene({ session }: { session: Session }) {
  const [posX, setPosX] = useState<number>(0);

  useEffect(() => {
    getState();
  }, []);

  const handleKeypress = (e: KeyboardEvent) => {
    let x = posX;
    if (e.key === KEY_LEFT) {
      if (x > 0) x--;
    }
    if (e.key === KEY_RIGHT) {
      if (x < 500) x++;
    }
    setPosX(x);
    updateRemoteStateDebounced({ coord_x: x });
  };

  useEffect(() => {
    window.addEventListener("keypress", handleKeypress);
    return () => window.removeEventListener("keypress", handleKeypress);
  });

  const getState = async () => {
    try {
      const user = await getCurrentUser();
      let { data, error, status } = await supabase
        .from("profiles")
        .select(`*`)
        .eq("id", user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }
      setPosX(data.coord_x);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const updateRemoteState = async (state: Record<string, unknown>) => {
    console.log("publish", state);
    try {
      const user = await getCurrentUser();
      const updates = {
        id: user.id,
        updated_at: new Date(),
        ...state,
      };
      let { error } = await supabase
        .from("profiles")
        .update(updates)
        .match({ id: user.id });
      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };
  const updateRemoteStateDebounced = debounce(updateRemoteState, 200);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Game</h1>
        <Toolbar session={session} />
        <div className={styles.fieldrow}>
          <p>X: {posX}</p>
        </div>
      </main>
    </div>
  );
}
