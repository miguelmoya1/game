import { HttpMethod } from '@prisma/client';
import { FastifyRequest } from 'fastify';

export class RequestDto {
  public readonly method: HttpMethod;
  public readonly url: string;
  public readonly query: Record<string, string>;
  public readonly headers: Record<string, string>;
  public readonly body: unknown;

  constructor(request: FastifyRequest) {
    this.method = request.method as HttpMethod;
    this.url = request.url;
    this.query = request.query as Record<string, string>;
    this.headers = request.headers as Record<string, string>;
    this.body = request.body;
  }
}
