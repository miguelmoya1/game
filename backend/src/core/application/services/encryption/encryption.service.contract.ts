export interface EncryptionService {
  encrypt(value: string): Promise<string>;
  compare(value: string, hash: string): Promise<boolean>;
}

export const ENCRYPTION_SERVICE = Symbol('ENCRYPTION_SERVICE');
