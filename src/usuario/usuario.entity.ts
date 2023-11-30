
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RedsocialEntity } from "../redsocial/redsocial.entity";
import { FotoEntity } from "../foto/foto.entity";

@Entity()
export class UsuarioEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    nombre: string;

    @Column()
    telefono: string;

    @ManyToOne(()=> RedsocialEntity, redsocial => redsocial.usuarios)
    redsocial: RedsocialEntity;

    @OneToMany(()=> FotoEntity, foto => foto.usuario)
    fotos: FotoEntity[];




}
