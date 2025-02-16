import { PROJECT_USE_CASE, ProjectUseCase } from '@game/use-cases-contracts';
import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(@Inject(PROJECT_USE_CASE) private readonly _projectUseCase: ProjectUseCase) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['x-api-key'];

    const project = await this._projectUseCase.getByApiKey(apiKey);

    request['project'] = project;

    return true;
  }
}
