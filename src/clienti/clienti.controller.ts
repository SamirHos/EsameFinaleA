import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ClientiService } from './clienti.service';
import { CreateClientiDto } from './dto/create-clienti.dto';
import { UpdateClientiDto } from './dto/update-clienti.dto';
import { CustomValidationPipe } from 'src/pipes/IsCodice';
import { LoginDto } from './dto/loginDTO';
import { AuthGuard } from 'src/guards/AuthGuards';
import { Public } from 'src/decorator/public.decorator';

@Controller('clienti')
export class ClientiController {
  constructor(private readonly clientiService: ClientiService) {}

  @Public()
  @Post('login')
  @UseGuards(AuthGuard)
  async login(@Body() cliente: LoginDto) {
    try {
      return await this.clientiService.loginUtente(cliente);
    } catch (error) {
      throw new HttpException(
        'errore durante il login',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':codiceCliente')
  async findOne(
    @Param('codiceCliente', CustomValidationPipe) codiceCliente: string,
  ) {
    try {
      return this.clientiService.getUtente(codiceCliente);
    } catch (error) {
      throw new HttpException(
        'errore durante la ricerca del cliente',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }
}
