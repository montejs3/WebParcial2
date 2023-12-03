import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessLogicException , BusinessError} from '../shared/errors/business-errors';
import { RedsocialEntity } from './redsocial.entity';
@Injectable()
export class RedsocialService {
    constructor(
        @InjectRepository(RedsocialEntity)
        private readonly redsocialRepository: Repository<RedsocialEntity>,
    ) {}

    async create(redsocial: RedsocialEntity): Promise<RedsocialEntity> {
        //Check that slogan is not null and have more than 10 characters
        if (redsocial.slogan != null && redsocial.slogan.length > 10){
            return await this.redsocialRepository.save(redsocial);
        }
        else{
            throw new BusinessLogicException("The redsocial dosent have the requirements", BusinessError.NOT_FOUND);
        }
    }

   
}
