import { Test, TestingModule } from '@nestjs/testing';
import { AlbumService } from './album.service';
import { Repository } from 'typeorm';
import { AlbumEntity } from './album.entity';
import { FotoEntity } from '../foto/foto.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';


describe('AlbumService', () => {
  let service: AlbumService;
  let albumRepository: Repository<AlbumEntity>;
  let fotoRepository: Repository<FotoEntity>;
  let album: AlbumEntity;
  let fotolist: FotoEntity[];
  let AlbumList: AlbumEntity[];



  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AlbumService],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
    albumRepository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
    fotoRepository = module.get<Repository<FotoEntity>>(getRepositoryToken(FotoEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    albumRepository.clear();
    AlbumList = [];
    for (let i = 0; i < 5; i++) {
      const album: AlbumEntity = await albumRepository.save({
        fechafin: "2000-08-01T00:00:00-05:00",
        fechainicio: "1900-08-01T00:00:00-05:00",
        titulo: faker.word.words()
      })
      AlbumList.push(album);
    }
  }


  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  

  it('findOne should return a album', async () => {
    const album: AlbumEntity = await service.findOne(AlbumList[0].id);
    expect(album).not.toBeNull();
    expect(album).toHaveProperty('id', AlbumList[0].id);
  });


  it('addFotoToAlbum should add a foto to an album', async () => {
    const foto: FotoEntity = await fotoRepository.save({
      ISO: faker.number.int({ min: 100, max: 6400 }),
      apertura: faker.number.int({ min: 2, max: 250 }),
      velObturacion: faker.number.int({ min: 1, max: 10 }),
      fecha: faker.date.past()
    })
    const album: AlbumEntity = await service.addFotoToAlbum(AlbumList[0].id, foto.id);
    expect(album).not.toBeNull();
    expect(album).toHaveProperty('id', AlbumList[0].id);
    expect(album.fotos).toHaveLength(1);
  });

  it('addFotoToAlbum should not add a foto to an album', async () => {
    const foto: FotoEntity = await fotoRepository.save({
      ISO: faker.number.int({ min: 100, max: 6400 }),
      apertura: faker.number.int({ min: 2, max: 250 }),
      velObturacion: faker.number.int({ min: 1, max: 10 }),
      fecha: "1985-08-01T00:00:00-05:00"
    })
    await expect(() => service.addFotoToAlbum("5681", foto.id)).rejects.toHaveProperty('message', 'The album with the given id was not found')
  });

  it('delete should delete a album', async () => {
    const album: AlbumEntity = await service.delete(AlbumList[0].id);
    expect(album).not.toBeNull();
  }
  );

  it('delete should not delete a album', async () => {
    await expect(() => service.delete("5681")).rejects.toHaveProperty('message', 'The album with the given id was not found')
  });


});
