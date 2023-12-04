import { Controller } from '@nestjs/common';
import { RedsocialService } from './redsocial.service';
import { plainToInstance } from 'class-transformer';
import { RedsocialEntity } from './redsocial.entity';
import { Body } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { RedsocialDto } from './redsocial.dto';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { UseInterceptors } from '@nestjs/common';



@Controller('redsocial')
@UseInterceptors(BusinessErrorsInterceptor)
export class RedsocialController {
    constructor( private readonly redSocialService: RedsocialService) {}

    @Post()
    async create(@Body() redsocialDTO: RedsocialDto) {
        const redsocial: RedsocialEntity = plainToInstance(RedsocialEntity, redsocialDTO)
        return await this.redSocialService.create(redsocial)
    }

}
