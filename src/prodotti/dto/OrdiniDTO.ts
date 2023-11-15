import { IsNumber, IsNotEmpty, Min } from 'class-validator';
import { Column } from 'typeorm';

export class OrdiniDTO {
  @IsNumber()
  @IsNotEmpty({ message: 'il campo è obbligatorio' })
  @Min(1)
  Giacenza: number;

  @IsNumber()
  @IsNotEmpty({ message: 'il campo è obbligatorio' })
  @Min(1)
  QuantitaMinimaOrdine: number;

  @IsNumber()
  @IsNotEmpty({ message: 'il campo è obbligatorio' })
  @Min(0.01)
  Prezzo: number;
}
