import { Role } from '../enums/role.enum';
import { CreateUserDTO } from '../user/dtos/create-user.dto';

export const createUserDTO: CreateUserDTO = {
  email: 'pietro@hotmail.com',
  name: 'Pietro Kucharski',
  password: '123456',
  birthAt: '2000-01-01',
  role: Role.ADMIN,
};
