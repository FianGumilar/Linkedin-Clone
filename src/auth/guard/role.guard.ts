import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Role } from '../models/role.enum';
import { ROLE_KEY } from '../decorators/role.decorator';
import { User } from '../models/user.interface'; 

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {};

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    console.log('--->', requiredRoles);

    if(!requiredRoles) {
      return true;
    }

      const { user }: { user: User } = context.switchToHttp().getRequest();
      // const user: User = {
      //   firstName: 'Vania',
      //   lastName: '',
      //   email: '',
      //   role: Role.USER,
      //   posts: []
      // }
  
      // does the current user making the request have those required roles?
      return requiredRoles.some((roles) => user.role.includes(roles));
    }
  }
