import type { HomeRepository } from '../../../domain/home/types';

export interface RepositorySelectionStrategy {
  pick(primary: HomeRepository, fallback: HomeRepository, reason?: unknown): HomeRepository;
}

export class CircuitOpenPreferMockStrategy implements RepositorySelectionStrategy {
  pick(primary: HomeRepository, fallback: HomeRepository, reason?: unknown): HomeRepository {
    // If there's a known circuit open signal, prefer fallback
    if (reason && typeof reason === 'object' && (reason as any).name === 'CircuitOpenError') {
      return fallback;
    }
    return primary;
  }
}
