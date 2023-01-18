import { Role } from './../../enums/role.enum';
import { ROLES_KEY } from '../../decorators/role.decorator';
import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const requeridRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requeridRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    const rolesFiltred = requeridRoles.filter((role) => role == user.role);

    return rolesFiltred.length > 0;
  }
}
