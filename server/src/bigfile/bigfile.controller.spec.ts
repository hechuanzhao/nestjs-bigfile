import { Test, TestingModule } from '@nestjs/testing';
import { BigfileController } from './bigfile.controller';
import { BigfileService } from './bigfile.service';

describe('BigfileController', () => {
  let controller: BigfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BigfileController],
      providers: [BigfileService],
    }).compile();

    controller = module.get<BigfileController>(BigfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
