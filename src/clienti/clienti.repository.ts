import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Clienti } from './entities/clienti.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClientiEstesoRepo extends Repository<Clienti> {
  constructor(
    @InjectRepository(Clienti)
    repository: Repository<Clienti>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
