import type { CreateEmailResponse } from 'resend';
import { SymbolRef } from '../../../../di/di-manager.ts';
import { Account } from '../../../domain/entities/account.entity.ts';
import { User } from '../../../domain/entities/user.entity.ts';

export interface EmailService {
  sendConfirmationEmail(account: Account, user: User): Promise<CreateEmailResponse>;
  sendPasswordResetEmail(account: Account, user: User): Promise<CreateEmailResponse>;
}

export const EMAIL_SERVICE = new SymbolRef<EmailService>(Symbol('EMAIL_SERVICE'));
