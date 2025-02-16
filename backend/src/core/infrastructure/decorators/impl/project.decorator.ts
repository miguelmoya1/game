import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentProject = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const project = request.project;

  return data ? project?.[data] : project;
});
