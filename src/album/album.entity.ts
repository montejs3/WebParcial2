import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FotoEntity } from "../foto/foto.entity";

@Entity()
export class AlbumEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    fechainicio: Date;

    @Column()
    fechafin: Date;

    @Column()
    titulo: string;

    @OneToMany(()=> FotoEntity, foto => foto.album)
    fotos: FotoEntity[];


}
