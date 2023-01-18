import { authRegisterDTO } from './../testing/auth-register-dto.mock';
import { resetToken } from './../testing/reset-token.mock';
import { jwtPayload } from './../testing/jwt-payload.mock';
import { accessToken } from './../testing/access-token.mock';
import { userEntityList } from './../testing/user-entity-list.mock';
import { mailerServiceMock } from './../testing/mailer-service.mock';
import { userServiceMock } from './../testing/user-service.mock';
import { jwtServiceMock } from './../testing/jwt-service.mock';
import { userRepositoryMock } from './../testing/user-repository.mock';
import { AuthService } from './auth.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        userRepositoryMock,
        jwtServiceMock,
        userServiceMock,
        mailerServiceMock,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  test('Validar definição', () => {
    expect(authService).toBeDefined();
  });

  describe('Token', () => {
    test('createToken method', () => {
      const result = authService.createToken(userEntityList[0]);

      expect(result).toEqual({ accessToken });
    });

    test('checkToken method', () => {
      const result = authService.checkToken(accessToken);

      expect(result).toEqual(jwtPayload);
    });

    test('isValidToken method', () => {
      const result = authService.isValidToken(accessToken);

      expect(result).toEqual(true);
    });
  });

  describe('Autenticação', () => {
    test('login method', async () => {
      const result = await authService.login('pietro@hotmail.com', '123456');

      expect(result).toEqual({ accessToken });
    });

    test('forget method', async () => {
      const result = await authService.forget('teste@hotmail.com');

      expect(result).toEqual({ success: true });
    });

    test('reset method', async () => {
      const result = await authService.reset('654321', resetToken);

      expect(result).toEqual({ accessToken });
    });

    test('register method', async () => {
      const result = await authService.register(authRegisterDTO);

      expect(result).toEqual({ accessToken });
    });
  });
});
