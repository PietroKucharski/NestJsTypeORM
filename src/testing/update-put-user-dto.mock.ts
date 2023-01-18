import { UpdatePutUserDTO } from '../user/dtos/update-put-user.dto';
import { Role } from '../enums/role.enum';

export const updatePutUserDTO: UpdatePutUserDTO = {
  email: 'pietro@hotmail.com',
  name: 'Pietro Kucharski',
  password: '123456',
  birthAt: '2000-01-01',
  role: Role.ADMIN,
};
