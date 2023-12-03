import { Controller } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { UseInterceptors } from '@nestjs/common';
import { AlbumService } from './album.service';
import { plainToInstance } from 'class-transformer';
import { AlbumEntity } from './album.entity';
import { Body } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { AlbumDto } from './album.dto';
import { Delete } from '@nestjs/common';
import { HttpCode } from '@nestjs/common';


@Controller('album')
@UseInterceptors(BusinessErrorsInterceptor)
export class AlbumController {
    constructor(
        private readonly albumService: AlbumService
    ) {}

    @Get(':albumId')
    async findOne(@Param('albumId') albumId: string) {
        return await this.albumService.findOne(albumId)
    }

    @Post()
    async create(@Body() albumDTO: AlbumDto) {
        const album: AlbumEntity = plainToInstance(AlbumEntity, albumDTO)
        return await this.albumService.create(album)
    }

    @Delete(':albumId')
    @HttpCode(204)
    async delete(@Param('albumId') albumId: string) {
        return await this.albumService.delete(albumId)
    }

    @Post(':albumId/fotos/:fotoId')
    async addFotoToAlbum(@Param('albumId') albumId: string, @Param('fotoId') fotoId: string) {
        return await this.albumService.addFotoToAlbum(albumId, fotoId)
    }
}
