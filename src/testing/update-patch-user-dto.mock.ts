import { Role } from '../enums/role.enum';
import { UpdatePatchUserDTO } from '../user/dtos/update-patch-user.dto';

export const updatePatchUserDTO: UpdatePatchUserDTO = {
  role: Role.ADMIN,
};
