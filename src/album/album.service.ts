
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessLogicException , BusinessError} from '../shared/errors/business-errors';
import { AlbumEntity } from './album.entity';
import { FotoEntity } from '../foto/foto.entity';

@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>,

        @InjectRepository(FotoEntity)
        private readonly fotoRepository: Repository<FotoEntity>,
    ) {}

    async addFotoToAlbum(idAlbum: string, idFoto: string): Promise<AlbumEntity> {
        const album: AlbumEntity = await this.albumRepository.findOne( {where:{id: idAlbum} , relations: ["fotos"]});
        const foto: FotoEntity = await this.fotoRepository.findOne( {where:{id: idFoto} , relations: ["album"]});
        if (!album) 
            throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
        if (!foto) 
            throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND);
        if(foto.album != null)
            throw new BusinessLogicException("The foto is already in an album", BusinessError.BAD_REQUEST);
        if(new Date(foto.fecha) < new Date(album.fechainicio) && new Date(foto.fecha) > new Date(album.fechafin))
            throw new BusinessLogicException("The foto is not in the album date range", BusinessError.BAD_REQUEST);

        album.fotos = [...album.fotos, foto];
        return await this.albumRepository.save(album);
    }


    async findOne(id: string): Promise<AlbumEntity> {
        const album: AlbumEntity = await this.albumRepository.findOne( {where:{id}, relations: ["fotos"]})
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
        const album: AlbumEntity = await this.albumRepository.findOne( {where:{id}, relations: ["fotos"] });
        if (!album) 
            throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
        // if ablum have fotos cant be deleted
        if(album.fotos.length == 0){
            return await this.albumRepository.remove(album);
        }
        else{
            throw new BusinessLogicException("The album have fotos", BusinessError.PRECONDITION_FAILED);
        }

       
    }



}
