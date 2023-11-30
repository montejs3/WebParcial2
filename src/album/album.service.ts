
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessLogicException , BusinessError} from '../shared/errors/business-errors';
import { AlbumEntity } from './album.entity';

@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>,
    ) {}

    async findAll(): Promise<AlbumEntity[]> {
        return await this.albumRepository.find();
    }

    async findOnes(id: string): Promise<AlbumEntity> {
        const album: AlbumEntity = await this.albumRepository.findOne( {where:{id}})
        if (!album) 
            throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
        return album;
    }

    async create(album: AlbumEntity): Promise<AlbumEntity> {
        // check that titulos is not null
        if (album.titulo != null){
            return await this.albumRepository.save(album);
        }
        else{
            throw new BusinessLogicException("The album dosent have the requirements", BusinessError.PRECONDITION_FAILED);
        }
    }

    async delete(id: string) {
        const album: AlbumEntity = await this.albumRepository.findOne( {where:{id} });
        if (!album) 
            throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
        return await this.albumRepository.remove(album);
    }



}
