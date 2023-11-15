import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateClientiDto } from './dto/create-clienti.dto';
import { UpdateClientiDto } from './dto/update-clienti.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clienti } from './entities/clienti.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/loginDTO';
import { CustomValidationPipe } from 'src/pipes/IsCodice';

@Injectable()
export class ClientiService {
  constructor(
    @InjectRepository(Clienti)
    private clientiRepository: Repository<Clienti>,
    private readonly jwtService: JwtService,
  ) {}

  async registraUtente(newRegister: LoginDto): Promise<boolean | Error> {
    try {
      const nuovoUtente = this.clientiRepository.create(newRegister);
      await this.clientiRepository.save(nuovoUtente);
      return true;
    } catch (error) {
      throw new Error();
    }
  }

  async loginUtente(cliente: LoginDto): Promise<any> {
    const trovaUtente = await this.clientiRepository.findOne({
      where: { email: cliente.email },
    });
    if (!trovaUtente) throw new NotFoundException('Utente inesistente');
    else {
      if (cliente?.password !== trovaUtente.password) {
        throw new UnauthorizedException();
      }
      const payload = {
        sub: trovaUtente.email,
        username: trovaUtente.email,
        codiceCliente: trovaUtente.codiceCliente,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
  }

  async getUtente(codiceDelCliente: string): Promise<any> {
    try {
      const utente: null | LoginDto = await this.clientiRepository.findOne({
        where: { codiceCliente: codiceDelCliente },
      });
      if (!utente) {
        throw new Error('utente non esistente');
      } else {
        return utente;
      }
    } catch (error) {
      throw new Error();
    }
  }
}
