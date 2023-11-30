import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessLogicException , BusinessError} from '../shared/errors/business-errors';
import { UsuarioEntity } from './usuario.entity';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
    ) {}

    async findAll(): Promise<UsuarioEntity[]> {
        return await this.usuarioRepository.find();
    }

    async findOnes(id: string): Promise<UsuarioEntity> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne( {where:{id}})
        if (!usuario) 
            throw new BusinessLogicException("The usuario with the given id was not found", BusinessError.NOT_FOUND);
        return usuario;
    }

    async create(usuario: UsuarioEntity): Promise<UsuarioEntity> {
        //Check that telefono have 10 characters
        if (usuario.telefono.length == 10){
            return await this.usuarioRepository.save(usuario);
        }
        else{
            throw new BusinessLogicException("The usuario dosent have the requirements", BusinessError.PRECONDITION_FAILED);
        }
    }

    
}
