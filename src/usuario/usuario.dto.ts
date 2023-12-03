import { IsNotEmpty, IsString } from 'class-validator';

export class UsuarioDto {

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    telefono: string;
}
