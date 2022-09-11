import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { Session } from "@supabase/supabase-js";
import Auth from "../components/Auth";
import Account from "../components/Account";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    let mounted = true;
    async function getInitialSession() {
      const session = await supabase.auth.session();
      if (mounted) {
        if (session) {
          setSession(session);
        }
        setIsLoading(false);
      }
    }
    getInitialSession();
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      mounted = false;

      data?.unsubscribe();
    };
  }, []);

  return (
    <div className="container" style={{ padding: 0 }}>
      {!session ? (
        <Auth />
      ) : (
        <Account key={session.user?.id} session={session} />
      )}
    </div>
  );
}
