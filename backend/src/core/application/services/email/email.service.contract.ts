import type { CreateEmailResponse } from 'resend';
import { AccountEntity, UserEntity } from '../../../domain/entities';

export interface EmailService {
  sendConfirmationEmail(
    account: AccountEntity,
    user: UserEntity,
  ): Promise<CreateEmailResponse>;
  sendPasswordResetEmail(
    account: AccountEntity,
    user: UserEntity,
  ): Promise<CreateEmailResponse>;
}

export const EMAIL_SERVICE = Symbol('EMAIL_SERVICE');
