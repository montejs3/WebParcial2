import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { faker } from '@faker-js/faker';


describe('UsuarioService', () => {
  let service: UsuarioService;
  let repository: Repository<UsuarioEntity>;
  let usuariolist: UsuarioEntity[];


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [UsuarioService],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    repository = module.get<Repository<UsuarioEntity>>(getRepositoryToken(UsuarioEntity));
    await seedDatabase();
  });


  const seedDatabase = async () => {
    repository.clear();
    usuariolist = [];
    for (let i = 0; i < 5; i++) {
      const usuario: UsuarioEntity = await repository.save({
        nombre: faker.name.firstName(),
        telefono: faker.lorem.word({ length: 10 })
      })
      usuariolist.push(usuario);
    }
  }



  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all albums', async () => {
    const usuarios: UsuarioEntity[] = await service.findAll();
    expect(usuarios).not.toBeNull();
    expect(usuarios).toHaveLength(usuariolist.length);
  });

  it('findOne should return a usuario', async () => {
    const usuario: UsuarioEntity = await service.findOne(usuariolist[0].id);
    expect(usuario).not.toBeNull();
    expect(usuario).toHaveProperty('id', usuariolist[0].id);
  });

  it('findOne should not return a usuario', async () => {
    await expect(() => service.findOne("5681")).rejects.toHaveProperty('message', 'The usuario with the given id was not found')
  })

  it('createUsuario should return a new usuario', async () => {
    const usuario: UsuarioEntity = {
      id: faker.word.noun(),
      nombre: faker.name.firstName(),
      telefono: faker.lorem.word({ length: 10 }),
      fotos: [],
      redsocial: null,
    }
    const newUsuario: UsuarioEntity = await service.create(usuario);
    expect(newUsuario).not.toBeNull();
    expect(newUsuario).toHaveProperty('id', usuario.id);
  })

  it('createUsuario should not return a new usuario', async () => {
    const usuario: UsuarioEntity = {
      id: "",
      nombre: "Facebook",
      telefono: "123456789",
      fotos: [],
      redsocial: null,
    }

    await expect(() => service.create(usuario)).rejects.toHaveProperty('message', 'The usuario dosent have the requirements')
  })

});
