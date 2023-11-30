import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoModule } from './foto/foto.module';
import { AlbumModule } from './album/album.module';
import { RedsocialModule } from './redsocial/redsocial.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AlbumEntity } from './album/album.entity';
import { RedsocialEntity } from './redsocial/redsocial.entity';
import { UsuarioEntity } from './usuario/usuario.entity';
import { FotoEntity } from './foto/foto.entity';


@Module({
  imports: [FotoModule,AlbumModule, RedsocialModule, UsuarioModule,
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    database: 'musica',
    entities: [ AlbumEntity, RedsocialEntity,UsuarioEntity, FotoEntity],
    synchronize: true,
    dropSchema: true,
    keepConnectionAlive: true
  }),
  

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}