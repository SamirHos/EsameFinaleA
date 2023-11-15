import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProdottoEntity } from './entities/prodotti.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClientiEstesoRepo extends Repository<ProdottoEntity> {
  constructor(
    @InjectRepository(ProdottoEntity)
    repository: Repository<ProdottoEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
