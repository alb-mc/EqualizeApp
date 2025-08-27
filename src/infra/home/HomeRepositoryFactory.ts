import type { HomeRepository } from '../../domain/home/types';
import { MockHomeRepository } from './MockHomeRepository';
import { RemoteHomeRepository } from './RemoteHomeRepository';
import { CircuitBreakerRepositoryDecorator } from '../resilience/CircuitBreakerRepositoryDecorator';
import { RetryRepositoryDecorator } from '../resilience/RetryRepositoryDecorator';
import { TimeoutRepositoryDecorator } from '../resilience/TimeoutRepositoryDecorator';
import { FailoverCompositeRepository } from './FailoverCompositeRepository';
import { CircuitOpenPreferMockStrategy } from './strategy/RepositorySelectionStrategy';

export type HomeRepoKind = 'mock' | 'remote';

export class HomeRepositoryFactory {
  static create(kind: HomeRepoKind = 'mock'): HomeRepository {
    switch (kind) {
      case 'mock':
      default:
        return new MockHomeRepository();
      case 'remote':
  // Compose decorators (outermost first): CircuitBreaker -> Retry -> Timeout -> Remote
  const remote = new RemoteHomeRepository('https://api.example.com');
  const withTimeout = new TimeoutRepositoryDecorator(remote, 4000);
  const withRetry = new RetryRepositoryDecorator(withTimeout, 3, 300);
  const withBreaker = new CircuitBreakerRepositoryDecorator(withRetry, 3, 3000);
  const mock = new MockHomeRepository();
  const strategy = new CircuitOpenPreferMockStrategy();
  return new FailoverCompositeRepository(withBreaker, mock, strategy);
    }
  }
}
