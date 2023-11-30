import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FotoEntity } from './foto.entity';
import { BusinessLogicException , BusinessError} from '../shared/errors/business-errors';


@Injectable()
export class FotoService {
    constructor(
        @InjectRepository(FotoEntity)
        private readonly fotoRepository: Repository<FotoEntity>,
    ) {}

    async findAll(): Promise<FotoEntity[]> {
        return await this.fotoRepository.find();
    }

    async findOnes(id: string): Promise<FotoEntity> {
        console.log('Provided ID:', id);
        const foto: FotoEntity = await this.fotoRepository.findOne( {where:{id}})
        if (!foto) 
            throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND);
        return foto;
    }

    async create(foto: FotoEntity): Promise<FotoEntity> {
       
        if ((foto.ISO > 100 || foto.ISO < 6400) && (foto.velObturacion >2 || foto.velObturacion < 250) && (foto.apertura > 1|| foto.apertura < 32)){
            return await this.fotoRepository.save(foto);
        }
        else{
            throw new BusinessLogicException("The foto dosent have the requirements", BusinessError.PRECONDITION_FAILED);
        }
    }

    async delete(id: string) {
        const foto: FotoEntity = await this.fotoRepository.findOne( {where:{id} });
        if (!foto) 
            throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND);
        return await this.fotoRepository.remove(foto);
    }

}
