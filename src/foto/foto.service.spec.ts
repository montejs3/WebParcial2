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
        ISO: faker.number.int(),
        apertura: faker.number.int(),
        velObturacion: faker.number.int(),
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

});
