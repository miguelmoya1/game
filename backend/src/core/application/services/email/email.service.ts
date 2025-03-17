import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { Resend } from 'resend';
import { inject } from '../../../../di/di-manager.ts';
import { Account } from '../../../domain/entities/account.entity.ts';
import { User } from '../../../domain/entities/user.entity.ts';
import { TRANSLATE_SERVICE } from '../translate/translate.service.contract.ts';
import type { EmailService } from './email.service.contract.ts';

export const EmailTemplate = {
  ConfirmEmail: 'confirm-email.html',
  ForgotPassword: 'forgot-password.html',
} as const;

export class EmailServiceImpl implements EmailService {
  readonly #resend: Resend;
  readonly #dirName = 'templates';
  readonly #from = 'support <support@miguelmo.dev>';
  readonly #translateService = inject(TRANSLATE_SERVICE);

  constructor() {
    this.#resend = new Resend(process.env.RESEND_API_KEY);
  }
  public sendConfirmationEmail = async (account: Account, user: User) => {
    const confirmationLink = `${process.env.URL_FRONTEND}/auth/confirm/${account.id}`;

    const language = user.language || 'en';

    return this.#resend.emails.send({
      from: this.#from,
      to: account.email,
      subject: this.#translateService.get(language)['CONFIRM_EMAIL_SUBJECT'],
      html: await this.#getTemplate(EmailTemplate.ConfirmEmail, {
        confirmationLink,
        ...this.#translateService.get(language),
      }),
    });
  };

  public sendPasswordResetEmail = async (account: Account, user: User) => {
    const resetLink = `${process.env.URL_FRONTEND}/auth/reset-password/${account.hashForPasswordReset}`;

    const language = user.language || 'en';

    return this.#resend.emails.send({
      from: this.#from,
      to: account.email,
      subject: this.#translateService.get(language)['FORGOT_PASSWORD_SUBJECT'],
      html: await this.#getTemplate(EmailTemplate.ForgotPassword, {
        resetLink,
        ...this.#translateService.get(language),
      }),
    });
  };

  #getTemplate = async (
    path: (typeof EmailTemplate)[keyof typeof EmailTemplate],
    variables: Record<string, string>,
  ) => {
    const dir = join(this.#dirName, path);

    const template = await readFile(dir, 'utf-8');

    return this.#replaceVariables(template, variables);
  };

  #replaceVariables = (template: string, variables: Record<string, string>) => {
    return Object.entries(variables).reduce(
      (acc, [key, value]) =>
        acc.replace(new RegExp(`{{ ${key} }}`, 'g'), value).replace(new RegExp(`{{${key}}}`, 'g'), value),
      template,
    );
  };
}
