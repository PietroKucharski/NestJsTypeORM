import { userEntityList } from './user-entity-list.mock';
import { UserService } from '../user/user.service';

export const userServiceMock = {
  provide: UserService,
  useValue: {
    readOne: jest.fn().mockResolvedValue(userEntityList[0]),
    create: jest.fn().mockResolvedValue(userEntityList[0]),
    readAll: jest.fn().mockResolvedValue(userEntityList),
    update: jest.fn().mockResolvedValue(userEntityList[0]),
    updatePartial: jest.fn().mockResolvedValue(userEntityList[0]),
    delete: jest.fn().mockResolvedValue(true),
    exist: jest.fn().mockResolvedValue(true),
  },
};
