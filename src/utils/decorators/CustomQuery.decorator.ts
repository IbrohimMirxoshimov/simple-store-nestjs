import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CustomQuery = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    request.query;

    return request.query;
  },
);
