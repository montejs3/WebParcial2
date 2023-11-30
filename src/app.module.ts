import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    database: 'musica',
    entities: [ ],
    synchronize: true,
    dropSchema: true,
    keepConnectionAlive: true
  }),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}