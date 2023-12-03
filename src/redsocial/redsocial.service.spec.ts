import { Test, TestingModule } from '@nestjs/testing';
import { RedsocialService } from './redsocial.service';
import { Repository } from 'typeorm';
import { RedsocialEntity } from './redsocial.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';



describe('RedsocialService', () => {
  let service: RedsocialService;
  let repository: Repository<RedsocialEntity>;
  let redsociallist: RedsocialEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [RedsocialService],
    }).compile();

    service = module.get<RedsocialService>(RedsocialService);
    repository = module.get<Repository<RedsocialEntity>>(getRepositoryToken(RedsocialEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    redsociallist = [];
    for (let i = 0; i < 5; i++) {
      const redsocial: RedsocialEntity = await repository.save({
        nombre: faker.word.words(),
        slogan: faker.word.words(),
        usuarios: []
      })
      redsociallist.push(redsocial);
    }
  }


  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should return a new redsocial', async () => {
    const redsocial: RedsocialEntity = {
      id: faker.word.noun(),
      nombre: faker.name.firstName(),
      slogan: faker.word.words({count: 35 }),
      usuarios: []}
    const newRedSocial: RedsocialEntity = await service.create(redsocial);
    expect(newRedSocial).not.toBeNull();
    expect(newRedSocial).toHaveProperty('id', redsocial.id);
  })

  it('create should not return a new redsocial', async () => {
    const redsocial: RedsocialEntity = {
      id: "",
      nombre: "Facebook",
      slogan: "Hola",
      usuarios: []}

    await expect(() => service.create(redsocial)).rejects.toHaveProperty('message', 'The redsocial dosent have the requirements')
  })
 

});
