import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUppercase,
  MinLength,
  isUppercase,
} from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Clienti {
  @Column()
  @MinLength(5)
  @IsUppercase()
  @IsNotEmpty()
  @PrimaryColumn()
  codiceCliente: string;

  @Column()
  @IsNotEmpty()
  nome: string;

  @Column()
  @IsNotEmpty()
  cognome: string;

  @Column()
  @IsDate()
  dataDiNascita: Date;

  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
