import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserContextService } from './user-context.service';

export const UserContext = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.userContext as UserContextService;
  },
);
