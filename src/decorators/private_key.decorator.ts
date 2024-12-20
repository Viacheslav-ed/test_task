import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const PrivateKey = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers?.authorization?.split(' ')[1];
  },
);
