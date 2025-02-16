import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

@Injectable()
export class EncryptionService {
  #saltRounds = 10;

  async encrypt(value: string) {
    return await hash(value, this.#saltRounds);
  }

  async compare(value: string, hash: string) {
    return await compare(value, hash);
  }
}
