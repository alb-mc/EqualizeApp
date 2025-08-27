import React, { createContext, useContext, useMemo } from 'react';
import type { GetHomeDataUseCase } from '../application/usecases/GetHomeData';

type UseCases = {
  getHomeData: GetHomeDataUseCase;
};

const Ctx = createContext<UseCases | undefined>(undefined);

export function UseCasesProvider({ value, children }: { value: UseCases; children: React.ReactNode }) {
  const memo = useMemo(() => value, [value]);
  return <Ctx.Provider value={memo}>{children}</Ctx.Provider>;
}

export function useUseCases(): UseCases {
  const v = useContext(Ctx);
  if (!v) throw new Error('useUseCases must be used within UseCasesProvider');
  return v;
}
