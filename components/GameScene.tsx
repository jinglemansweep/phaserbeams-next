import React, { useCallback, useState, useEffect } from "react";
import debounce from "lodash.debounce";
import Toolbar from "./Toolbar";
import {
  supabase,
  getUser,
  getProfile,
  upsertProfile,
  getGameState,
} from "../utils/supabase";
import { Session } from "@supabase/gotrue-js";

import styles from "../styles/Home.module.css";

const KEY_LEFT = "o";
const KEY_RIGHT = "p";

const upsertProfileDebounced = debounce(upsertProfile, 200);

export default function GameScene({ session }: { session: Session }) {
  const [posX, setPosX] = useState<number>(0);
  const [gameState, setGameState] = useState<Record<string, unknown>[]>([]);

  useEffect(() => {
    async function _async() {
      const profile = await getProfile();
      if (profile) {
        setPosX(profile.coord_x);
      } else {
        upsertProfile();
      }
    }
    _async();
  }, []);

  useEffect(() => {
    async function _async() {
      const gameState = await getGameState();
      if (gameState) {
        setGameState(gameState);
      }
    }
    _async();
  }, [posX]);

  useEffect(() => {
    window.addEventListener("keypress", handleKeypress);
    return () => window.removeEventListener("keypress", handleKeypress);
  });

  const handleKeypress = (e: KeyboardEvent) => {
    if (e.key === KEY_LEFT) {
      moveX(-1);
    }
    if (e.key === KEY_RIGHT) {
      moveX(1);
    }
  };

  const moveX = (amount: number = 1) => {
    let x = posX + amount;
    if (x > 0 && x < 300) {
      setPosX(x);
      upsertProfileDebounced({ coord_x: x });
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Game</h1>

        <div className={styles.fieldrow}>
          <p>X: {posX}</p>
          <button
            onClick={() => {
              moveX(-1);
            }}
          >
            -
          </button>
          <button
            onClick={() => {
              moveX(1);
            }}
          >
            +
          </button>
        </div>
        <div>
          <pre>
            {gameState.map((player) => `${player.id}: ${player.coord_x}`)}
          </pre>
        </div>
        <Toolbar session={session} />
      </main>
    </div>
  );
}
