import { Controller, Get } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common';
import { FotoService } from './foto.service';
import { plainToInstance } from 'class-transformer';
import { FotoEntity } from './foto.entity';
import { Body } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { HttpCode } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { FotoDto } from './foto.dto';


@Controller('foto')
@UseInterceptors(BusinessErrorsInterceptor)
export class FotoController {
    constructor(
        private readonly fotoService: FotoService
    ) {}

    @Get()
    async findAll() {
        return await this.fotoService.findAll();
    }

    @Get(':fotoId')
    async findOne(@Param('fotoId') fotoId: string) {
        return await this.fotoService.findOne(fotoId)
    }

    @Post()
    async create(@Body() fotoDTO: FotoDto) {
        const foto: FotoEntity = plainToInstance(FotoEntity, fotoDTO)
        return await this.fotoService.create(foto)
    }

    @Delete(':fotoId')
    @HttpCode(204)
    async delete(@Param('fotoId') fotoId: string) {
        return await this.fotoService.delete(fotoId)
    }


}
