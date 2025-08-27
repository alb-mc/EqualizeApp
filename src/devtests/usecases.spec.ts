// Lightweight verification harness (no Jest): run in Node/ts-node if desired
import { GetHomeDataUseCase } from '../application/usecases/GetHomeData';
import { MockHomeRepository } from '../infra/home/MockHomeRepository';

async function run() {
  const uc = new GetHomeDataUseCase(new MockHomeRepository());
  const data = await uc.execute();
  console.log('[GetHomeDataUseCase] upcoming:', data.upcoming.name);
  console.log('[GetHomeDataUseCase] results:', data.results.length);
  console.log('[GetHomeDataUseCase] care:', data.care.length);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
