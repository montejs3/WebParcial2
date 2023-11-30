import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedsocialEntity } from './redsocial.entity';
import { RedsocialService } from './redsocial.service';

@Module({
    imports: [TypeOrmModule.forFeature([RedsocialEntity])],
    providers: [RedsocialService],
})
export class RedsocialModule {}
