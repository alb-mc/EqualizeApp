export class CircuitOpenError extends Error {
  constructor(message = 'Circuit breaker: OPEN') {
    super(message);
    this.name = 'CircuitOpenError';
  }
}
