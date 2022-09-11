import React, { useState, useEffect } from "react";
import { useKeyPress } from "@react-typed-hooks/use-key-press";
import Account from "./Account";
import Toolbar from "./Toolbar";
import { supabase, getCurrentUser } from "../utils/supabase";
import { Session } from "@supabase/gotrue-js";
import styles from "../styles/Home.module.css";

export default function GameScene({ session }: { session: Session }) {
  const keyLeft = useKeyPress({ targetKey: "o" });
  const keyRight = useKeyPress({ targetKey: "p" });
  const keyUp = useKeyPress({ targetKey: "q" });
  const keyDown = useKeyPress({ targetKey: "a" });
  const keyAction = useKeyPress({ targetKey: "m" });

  async function setCoordX(x: number) {
    try {
      //setLoading(true);
      const user = await getCurrentUser();
      console.log(user);
      const updates = {
        id: user.id,
        coord_x: x,
        updated_at: new Date(),
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
    } finally {
      //setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Game</h1>
        <div className={styles.fieldrow}>
          <p onClick={() => setCoordX(Math.floor(Math.random() * 100))}>GAME</p>
        </div>
        <p>
          Keys:
          {keyLeft && "L"}
          {keyRight && "R"}
          {keyUp && "U"}
          {keyDown && "D"}
          {keyAction && "A"}
        </p>
        <Toolbar session={session} />
        <Account session={session} />
      </main>
    </div>
  );
}
