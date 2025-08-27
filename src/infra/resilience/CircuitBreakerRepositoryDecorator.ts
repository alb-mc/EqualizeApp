import { CircuitOpenError } from './errors';
import type { HomeData, HomeRepository } from '../../domain/home/types';

type State = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

export class CircuitBreakerRepositoryDecorator implements HomeRepository {
  private state: State = 'CLOSED';
  private failureCount = 0;
  private nextTry = 0;

  constructor(
    private readonly inner: HomeRepository,
    private readonly failureThreshold: number = 3,
    private readonly cooldownMs: number = 3000
  ) {}

  private canPassThrough() {
    const now = Date.now();
    if (this.state === 'OPEN') {
      if (now >= this.nextTry) {
        this.state = 'HALF_OPEN';
        return true; // allow one trial
      }
      return false;
    }
    return true;
  }

  private onSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }

  private onFailure() {
    this.failureCount += 1;
    if (this.failureCount >= this.failureThreshold) {
      this.state = 'OPEN';
      this.nextTry = Date.now() + this.cooldownMs;
    }
  }

  async getHomeData(): Promise<HomeData> {
    if (!this.canPassThrough()) {
  throw new CircuitOpenError();
    }
    try {
      const res = await this.inner.getHomeData();
      this.onSuccess();
      return res;
    } catch (e) {
      this.onFailure();
      throw e;
    }
  }
}
