import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProdottiDto } from './dto/create-prodotti.dto';
import { UpdateProdottiDto } from './dto/update-prodotti.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdottoEntity } from './entities/prodotti.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProdottiService {
  constructor(
    @InjectRepository(ProdottoEntity)
    private readonly productRepository: Repository<ProdottoEntity>,
  ) {}

  async inserisciProdotto(prodotto: ProdottoEntity): Promise<ProdottoEntity> {
    if (
      prodotto.QuantitaMinimaOrdine <= 0 ||
      prodotto.Giacenza <= 0 ||
      prodotto.Prezzo <= 0
    ) {
      throw new NotFoundException(
        'QuantitaMinimaOrdine, Giacenza e Prezzo devono essere > 0',
      );
    }

    return this.productRepository.save(prodotto);
  }

  async ordinaProdotto(
    idProdotto: number,
    quantita: number,
  ): Promise<ProdottoEntity> {
    if (quantita <= 0) {
      throw new BadRequestException(
        'La quantità deve essere un numero maggiore di 0',
      );
    }

    const prodotto = await this.productRepository.findOne({
      where: { idProdotto },
    });

    if (!prodotto) {
      throw new NotFoundException('Prodotto non trovato');
    }

    prodotto.Giacenza += quantita;

    await this.productRepository.save(prodotto);

    return prodotto;
  }

  async vendiProdotto(
    idProdotto: number,
    quantita: number,
  ): Promise<ProdottoEntity> {
    if (quantita <= 0) {
      throw new BadRequestException('La quantità deve essere maggiore di 0');
    }

    const prodotto = await this.productRepository.findOne({
      where: { idProdotto },
    });

    if (!prodotto) {
      throw new NotFoundException('Prodotto non trovato');
    }

    if (quantita > prodotto.Giacenza) {
      throw new BadRequestException('Quantità insufficiente in magazzino');
    }

    prodotto.Giacenza -= quantita;

    await this.productRepository.save(prodotto);

    return prodotto;
  }

  async GetProdotti() {
    // Logica per ottenere tutti gli utenti dal tuo datastore (ad esempio, un database)
    const prodotti = await this.productRepository.find();
    return prodotti;
  }
}
