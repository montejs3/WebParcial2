import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './album.entity';
import { AlbumService } from './album.service';
import { FotoEntity } from '../foto/foto.entity';
import { FotoService } from '../foto/foto.service';
import { AlbumController } from './album.controller';

@Module({
    imports: [TypeOrmModule.forFeature([AlbumEntity, FotoEntity])],
    providers: [AlbumService, FotoService],
    controllers: [AlbumController],
})
export class AlbumModule {}
