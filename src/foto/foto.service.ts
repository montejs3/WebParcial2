import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FotoEntity } from './foto.entity';
import { BusinessLogicException , BusinessError} from '../shared/errors/business-errors';
import { AlbumEntity } from '../album/album.entity';


@Injectable()
export class FotoService {
    constructor(
        @InjectRepository(FotoEntity)
        private readonly fotoRepository: Repository<FotoEntity>,
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>,
    ) {}

    async findAll(): Promise<FotoEntity[]> {
        return await this.fotoRepository.find();
    }

    async findOne(id: string): Promise<FotoEntity> {
        const foto: FotoEntity = await this.fotoRepository.findOne( {where:{id}})
        if (!foto) 
            throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND);
        return foto;
    }

    async create(foto: FotoEntity): Promise<FotoEntity> {
       
        if(foto.ISO < 100 || foto.ISO > 6400)
            throw new BusinessLogicException("The ISO must be between 100 and 6400", BusinessError.BAD_REQUEST);
        if(foto.apertura < 1.4 || foto.apertura > 32)
            throw new BusinessLogicException("The aperture must be between 1.4 and 22", BusinessError.BAD_REQUEST);
        if(foto.velObturacion < 2 || foto.velObturacion > 250)
            throw new BusinessLogicException("The shutter speed must be between 1 and 4000", BusinessError.BAD_REQUEST);

        return await this.fotoRepository.save(foto);
    }

    async delete(id: string) {
        const foto: FotoEntity = await this.fotoRepository.findOne( {where:{id} , relations: ["album"]});
        if (!foto) 
            throw new BusinessLogicException("The foto with the given id was not found", BusinessError.NOT_FOUND);

        if(foto.album != null){
            const album: AlbumEntity = await this.albumRepository.findOne( {where:{id: foto.album.id} , relations: ["fotos"]});
            if(album.fotos.length == 1){
                await this.fotoRepository.remove(foto);
                await this.albumRepository.delete(album.id);
            }
        }
        else{
            await this.fotoRepository.remove(foto);
        }
        


    }

}
