import { Test, TestingModule } from '@nestjs/testing';
import { ProdottiService } from './prodotti.service';

describe('ProdottiService', () => {
  let service: ProdottiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProdottiService],
    }).compile();

    service = module.get<ProdottiService>(ProdottiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
