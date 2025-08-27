import type { HomeData, HomeRepository } from '../../domain/home/types';
import type { UseCase } from './UseCase';

export class GetHomeDataUseCase implements UseCase<void, HomeData> {
  constructor(private readonly repo: HomeRepository) {}
  async execute(): Promise<HomeData> {
    return this.repo.getHomeData();
  }
}
