import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { paperTheme } from '../theme/paperTheme';
import { HomeRepositoryProvider } from '../providers/HomeRepositoryProvider';
import { MockHomeRepository } from '../infra/home/MockHomeRepository';
import { UseCasesProvider } from '../providers/UseCasesProvider';
import { GetHomeDataUseCase } from '../application/usecases/GetHomeData';
import { HomeRepositoryFactory } from '../infra/home/HomeRepositoryFactory';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  const repo = React.useMemo(() => HomeRepositoryFactory.create('mock'), []);
  const useCases = React.useMemo(() => ({ getHomeData: new GetHomeDataUseCase(repo) }), [repo]);
  return (
    <PaperProvider theme={paperTheme}>
      <HomeRepositoryProvider repo={repo}>
        <UseCasesProvider value={useCases}>{children}</UseCasesProvider>
      </HomeRepositoryProvider>
    </PaperProvider>
  );
}
