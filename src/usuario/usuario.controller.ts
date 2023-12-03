import { Controller } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { UseInterceptors } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { plainToInstance } from 'class-transformer';
import { UsuarioEntity } from './usuario.entity';
import { Body } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { UsuarioDto } from './usuario.dto';


@Controller('usuario')
@UseInterceptors(BusinessErrorsInterceptor)
export class UsuarioController {
    constructor(
        private readonly usuarioService: UsuarioService
    ) {}

    @Get()
    async findAll() {
        return await this.usuarioService.findAll();
    }
    
    @Get(':usuarioId')
    async findOne(@Param('usuarioId') usuarioId: string) {
        return await this.usuarioService.findOne(usuarioId)
    }

    @Post()
    async create(@Body() usuarioDTO: UsuarioDto) {
        const usuario: UsuarioEntity = plainToInstance(UsuarioEntity, usuarioDTO)
        return await this.usuarioService.create(usuario)
    }


}
