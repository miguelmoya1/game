import type { CreateEmailResponse } from 'resend';
import { Account } from '../../../domain/entities/impl/account.entity';
import { User } from '../../../domain/entities/impl/user.entity';

export interface EmailService {
  sendConfirmationEmail(
    account: Account,
    user: User,
  ): Promise<CreateEmailResponse>;
  sendPasswordResetEmail(
    account: Account,
    user: User,
  ): Promise<CreateEmailResponse>;
}

export const EMAIL_SERVICE = Symbol('EMAIL_SERVICE');
