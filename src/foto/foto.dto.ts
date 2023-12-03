import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class FotoDto {

    @IsNotEmpty()
    @IsNumber()
    ISO: number;

    @IsNotEmpty()
    @IsNumber()
    velObturacion: number;

    @IsNotEmpty()
    @IsNumber()
    apertura: number;

    @IsNotEmpty()
    @IsDateString()
    fecha: Date;
}
