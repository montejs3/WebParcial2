import { IsNotEmpty, IsString, IsDateString } from 'class-validator';
export class AlbumDto {
    @IsNotEmpty()
    @IsDateString()
    fechainicio: Date;

    @IsNotEmpty()
    @IsDateString()
    fechafin: Date;

    @IsNotEmpty()
    @IsString()
    titulo: string;
}
