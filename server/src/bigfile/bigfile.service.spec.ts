import { Test, TestingModule } from '@nestjs/testing';
import { BigfileService } from './bigfile.service';

describe('BigfileService', () => {
  let service: BigfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BigfileService],
    }).compile();

    service = module.get<BigfileService>(BigfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
