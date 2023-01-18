import { jwtPayload } from './jwt-payload.mock';
import { accessToken } from './access-token.mock';
import { AuthService } from '../auth/auth.service';

export const authServiceMock = {
  provide: AuthService,
  useValue: {
    createToken: jest.fn().mockRejectedValue({ accessToken }),
    checkToken: jest.fn().mockReturnValue(jwtPayload),
    isValidToken: jest.fn().mockRejectedValue(true),
    login: jest.fn().mockReturnValue({ accessToken }),
    forget: jest.fn().mockResolvedValue({ success: true }),
    reset: jest.fn().mockReturnValue({ accessToken }),
    register: jest.fn().mockReturnValue({ accessToken }),
  },
};
