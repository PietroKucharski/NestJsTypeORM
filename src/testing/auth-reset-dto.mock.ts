import { resetToken } from './reset-token.mock';
import { AuthResetDTO } from './../auth/dtos/auth-reset.dto';

export const authResetDTO: AuthResetDTO = {
  password: '654321',
  token: resetToken,
};
