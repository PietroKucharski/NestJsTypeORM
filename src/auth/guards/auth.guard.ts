import { AuthService } from '../../auth/auth.service';
import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { UserService } from '../../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    try {
      const data = this.authService.checkToken(
        (authorization ?? '').split(' ')[1],
      );

      request.tokenPayload = data;

      request.user = await this.userService.readOne(data.id);

      return true;
    } catch (e) {
      return false;
    }
  }
}
