import { RoleGuard } from './../auth/guards/role.guard';
import { updatePutUserDTO } from './../testing/update-put-user-dto.mock';
import { userEntityList } from './../testing/user-entity-list.mock';
import { createUserDTO } from './../testing/create-user-dto.mock';
import { UserService } from '../user/user.service';
import { AuthGuard } from './../auth/guards/auth.guard';
import { userServiceMock } from './../testing/user-service.mock';
import { UserController } from './user.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { updatePatchUserDTO } from '../testing/update-patch-user-dto.mock';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [userServiceMock],
      controllers: [UserController],
    })
      .overrideGuard(AuthGuard)
      .useValue({ CanActivate: jest.fn(() => true) })
      .compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  test('Validar definição', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('Teste da aplicação dos guards neste controller', () => {
    test('Se os guards estão aplicados', async () => {
      const guards = Reflect.getMetadata('__guards__', UserController);

      expect(guards.length).toEqual(2);
      expect(new guards[0]()).toBeInstanceOf(AuthGuard);
      expect(new guards[1]()).toBeInstanceOf(RoleGuard);
    });
  });

  describe('Create', () => {
    test('create method', async () => {
      const result = await userController.create(createUserDTO);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Read', () => {
    test('read method', async () => {
      const result = await userController.read();

      expect(result).toEqual(userEntityList);
    });

    test('readOne method', async () => {
      const result = await userController.readOne(1);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Update', () => {
    test('update method', async () => {
      const result = await userController.update(updatePutUserDTO, 1);

      expect(result).toEqual(userEntityList[0]);
    });

    test('updatePartial method', async () => {
      const result = await userController.updatePatial(updatePatchUserDTO, 1);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Delete', () => {
    test('update method', async () => {
      const result = await userController.delete(1);

      expect(result).toEqual({ success: true });
    });
  });
});
