import { compare, hash } from 'bcrypt';
import type { EncryptionService } from './encryption.service.contract';

export class EncryptionServiceImpl implements EncryptionService {
  async encrypt(value: string) {
    return await hash(value, 10);
  }

  async compare(value: string, hash: string) {
    return await compare(value, hash);
  }
}
