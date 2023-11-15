import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ProdottiService } from './prodotti.service';
import { CreateProdottiDto } from './dto/create-prodotti.dto';
import { UpdateProdottiDto } from './dto/update-prodotti.dto';
import { Public } from 'src/decorator/public.decorator';
import { ProdottoEntity } from './entities/prodotti.entity';

@Controller('prodotti')
export class ProdottiController {
  constructor(private readonly prodottiService: ProdottiService) {}

  @Get()
  async getProdotti(): Promise<ProdottoEntity[]> {
    try {
      return await this.prodottiService.GetProdotti();
    } catch (error) {
      throw new HttpException(
        'Errore durante il recupero dei prodotti',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post()
  async inserisciProdotto(
    @Body() prodotto: ProdottoEntity,
  ): Promise<ProdottoEntity> {
    try {
      return this.prodottiService.inserisciProdotto(prodotto);
    } catch (error) {
      throw new HttpException(
        "errore durante l'inserimento del prodotto",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Public() // Decoratore per indicare che l'endpoint è pubblico
  @Put('ordina/:id')
  async ordinaProdotto(
    @Param('idProdotto', ParseIntPipe) idProdotto: number,
    @Body('quantita', ParseIntPipe) quantita: number,
  ): Promise<ProdottoEntity> {
    try {
      return this.prodottiService.ordinaProdotto(idProdotto, quantita);
    } catch (error) {
      throw new HttpException(
        "errore durante l'ordine",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('vendi/:id')
  async vendeProdotto(
    @Param('idProdotto', ParseIntPipe) idProdotto: number,
    @Body('quantita', ParseIntPipe) quantita: number,
  ): Promise<ProdottoEntity> {
    try {
      return this.prodottiService.vendiProdotto(idProdotto, quantita);
    } catch (error) {
      throw new HttpException(
        'errore durante la vendita',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
