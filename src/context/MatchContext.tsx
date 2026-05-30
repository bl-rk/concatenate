import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Profile } from '../types';

type MatchContextValue = { matches: Profile[]; addMatch: (p: Profile) => void };
const MatchContext = createContext<MatchContextValue | undefined>(undefined);

export const MatchProvider = ({ children }: { children: React.ReactNode }) => {
  const [matches, setMatches] = useState<Profile[]>([]);
  const addMatch = useCallback((p: Profile) => {
    setMatches((prev) => (prev.some((m) => m.id === p.id) ? prev : [...prev, p]));
  }, []);
  const value = useMemo(() => ({ matches, addMatch }), [matches, addMatch]);
  return <MatchContext.Provider value={value}>{children}</MatchContext.Provider>;
};

export const useMatches = () => {
  const ctx = useContext(MatchContext);
  if (!ctx) throw new Error('useMatches must be used within MatchProvider');
  return ctx;
};