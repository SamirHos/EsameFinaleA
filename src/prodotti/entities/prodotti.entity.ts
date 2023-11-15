import { IsNotEmpty, IsNumber, IsString, Matches, Min } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';
@Entity('prodotti')
export class ProdottoEntity {
  //   @ApiProperty()
  @IsNumber()
  @IsNotEmpty({ message: 'il campo è obbligatorio' })
  @Column()
  @PrimaryColumn()
  idProdotto: number;
  //   @ApiProperty()
  @IsString()
  @Column()
  NomeProdotto: string;

  @IsNumber()
  @IsNotEmpty({ message: 'il campo è obbligatorio' })
  @Min(1)
  @Column()
  Giacenza: number;

  @IsNumber()
  @IsNotEmpty({ message: 'il campo è obbligatorio' })
  @Min(1)
  @Column()
  QuantitaMinimaOrdine: number;

  @IsNumber()
  @IsNotEmpty({ message: 'il campo è obbligatorio' })
  @Min(0.01)
  @Column()
  Prezzo: number;
}
