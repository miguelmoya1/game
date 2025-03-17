import { SymbolRef } from '../../../../di/di-manager.ts';

export interface EncryptionService {
  encrypt(value: string): Promise<string>;
  compare(value: string, hash: string): Promise<boolean>;
}

export const ENCRYPTION_SERVICE = new SymbolRef<EncryptionService>(Symbol('ENCRYPTION_SERVICE'));
