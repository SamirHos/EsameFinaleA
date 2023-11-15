import { Module } from '@nestjs/common';
import { ClientiService } from './clienti.service';
import { ClientiController } from './clienti.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clienti } from './entities/clienti.entity';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Clienti]),
    ConfigModule.forRoot(), //carica .ENV
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '120s' },
    }),
  ],
  controllers: [ClientiController],
  providers: [ClientiService],
})
export class ClientiModule {}
