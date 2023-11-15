import { Test, TestingModule } from '@nestjs/testing';
import { ProdottiController } from './prodotti.controller';
import { ProdottiService } from './prodotti.service';

describe('ProdottiController', () => {
  let controller: ProdottiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdottiController],
      providers: [ProdottiService],
    }).compile();

    controller = module.get<ProdottiController>(ProdottiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
