import { Inject, Injectable } from '@nestjs/common';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { Resend } from 'resend';
import { AccountEntity, UserEntity } from '../../../domain/entities';
import { TRANSLATE_SERVICE, TranslateService } from '../translate/translate.service.contract';
import type { EmailService } from './email.service.contract.ts';

export enum EmailTemplate {
  CONFIRM_EMAIL = 'confirm-email.html',
  FORGOT_PASSWORD = 'forgot-password.html',
}

@Injectable()
export class EmailServiceImpl implements EmailService {
  readonly #resend = new Resend(process.env.RESEND_API_KEY);
  readonly #dirName = 'templates';
  readonly #from = 'support <support@miguelmo.dev>';

  constructor(
    @Inject(TRANSLATE_SERVICE)
    private readonly _translateService: TranslateService,
  ) {}

  public sendConfirmationEmail = async (account: AccountEntity, user: UserEntity) => {
    const confirmationLink = `${process.env.URL_FRONTEND}/auth/confirm/${account.id}`;

    const language = user.language || 'en';

    return this.#resend.emails.send({
      from: this.#from,
      to: account.email,
      subject: this._translateService.get(language)['CONFIRM_EMAIL_SUBJECT'] || '',
      html: await this.#getTemplate(EmailTemplate.CONFIRM_EMAIL, {
        confirmationLink,
        ...this._translateService.get(language),
      }),
    });
  };

  public sendPasswordResetEmail = async (account: AccountEntity, user: UserEntity) => {
    const resetLink = `${process.env.URL_FRONTEND}/auth/reset-password/${account.hashForPasswordReset}`;

    const language = user.language || 'en';

    return this.#resend.emails.send({
      from: this.#from,
      to: account.email,
      subject: this._translateService.get(language)['FORGOT_PASSWORD_SUBJECT'],
      html: await this.#getTemplate(EmailTemplate.FORGOT_PASSWORD, {
        resetLink,
        ...this._translateService.get(language),
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
