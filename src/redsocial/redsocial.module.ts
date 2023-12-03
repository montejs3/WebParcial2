import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedsocialEntity } from './redsocial.entity';
import { RedsocialService } from './redsocial.service';
import { RedsocialController } from './redsocial.controller';

@Module({
    imports: [TypeOrmModule.forFeature([RedsocialEntity])],
    providers: [RedsocialService],
    controllers: [RedsocialController],
})
export class RedsocialModule {}
