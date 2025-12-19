import React, { createContext, useContext, useMemo, useState } from "react";

export type Role = "PLAYER" | "MASTER";

export type Identity = {
  code: string;
  name: string;
  role: Role;
};

type SessionValue = {
  identity: Identity | null;
  setIdentity: (i: Identity | null) => void;
  isMaster: boolean;
};

const SessionContext = createContext<SessionValue | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [identity, setIdentity] = useState<Identity | null>(null);

  const value = useMemo<SessionValue>(() => {
    return {
      identity,
      setIdentity,
      isMaster: identity?.role === "MASTER",
    };
  }, [identity]);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within SessionProvider");
  return ctx;
}
