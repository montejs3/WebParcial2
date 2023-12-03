import { Test, TestingModule } from '@nestjs/testing';
import {Repository} from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';
import { FotoEntity } from './foto.entity';
import { FotoService } from './foto.service';

describe('FotoService', () => {
  let service: FotoService;
  let repository: Repository<FotoEntity>;
  let fotolist: FotoEntity[];


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [FotoService],
    }).compile();

    service = module.get<FotoService>(FotoService);
    repository = module.get<Repository<FotoEntity>>(getRepositoryToken(FotoEntity));
    await seedDatabase();
  });

   const seedDatabase = async () => {
    repository.clear();
    fotolist = [];
    for (let i = 0; i < 5; i++) {
      const foto: FotoEntity = await repository.save({
        ISO: faker.number.int({ min: 100, max: 6400 }),
        apertura: faker.number.int({ min: 2, max: 250 }),
        velObturacion: faker.number.int({ min: 1, max: 10 }),
        fecha: faker.date.past()})
      fotolist.push(foto);
    }
  }

  
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all albums', async () => {
    const fotos: FotoEntity[] = await service.findAll();
    expect(fotos).not.toBeNull();
    expect(fotos).toHaveLength(fotolist.length);
  });

  it('findOne should return a foto', async () => {
    const foto: FotoEntity = await service.findOne(fotolist[0].id);
    expect(foto).not.toBeNull();
    expect(foto).toHaveProperty('id', fotolist[0].id);
  });

  it('findOne should not return a foto', async () => {
    await expect(() => service.findOne("5681")).rejects.toHaveProperty('message', 'The foto with the given id was not found')
  })

  it('createFoto should return a new foto', async () => {
    const foto: FotoEntity = {
      id: faker.random.numeric(),
      ISO: faker.number.int({ min: 100, max: 6400 }),
      velObturacion: faker.number.int({ min: 2, max: 250 }),
      apertura: faker.number.int({ min: 2, max: 10 }),
      fecha: faker.date.past(),
      album: null,
      usuario: null
    }
    const newFoto: FotoEntity = await service.create(foto);

    expect(newFoto).not.toBeNull()
    expect(foto).not.toBeNull()
    expect(foto.ISO).toBeDefined()
    expect(foto.velObturacion).toBeDefined()
    expect(foto.apertura).toBeDefined()
    expect(foto.id).toBeDefined()
    expect(foto.album).toBeDefined()
    expect(foto.fecha).toBeDefined()
    expect(foto.usuario).toBeDefined()
  })


  it('createFoto should not return a new Foto', async () => {
    const foto: FotoEntity = {
      id: faker.random.numeric(),
      ISO: faker.number.int({ min: 1, max: 99 }),
      velObturacion: faker.number.int({ min: 2, max: 250 }),
      apertura: faker.number.int({ min: 1, max: 10 }),
      fecha: faker.date.past(),
      album: null,
      usuario: null
    }
    await expect(() => service.create(foto)).rejects.toHaveProperty('message', 'The ISO must be between 100 and 6400')
  });

  it('delete should remove a foto', async () => {
    const foto: FotoEntity = fotolist[0];
    await service.delete(foto.id);
     const deletedfoto: FotoEntity = await repository.findOne({ where: { id: foto.id } })
    expect(deletedfoto).toBeNull();
  });

  it('delete should throw an exception for an invalid foto', async () => {
    const foto: FotoEntity = fotolist[0];
    await service.delete(foto.id);
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", "The foto with the given id was not found")
  });

});
