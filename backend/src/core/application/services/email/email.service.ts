import { Account, User } from '@game/entities';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { Resend } from 'resend';
import { TranslateService } from '../translate/translate.service';

export enum EmailTemplate {
  ConfirmEmail = 'confirm-email.html',
  ForgotPassword = 'forgot-password.html',
}

@Injectable()
export class EmailService {
  #resend = new Resend(this._configService.get('RESEND_API_KEY'));
  #dirName = 'templates';

  #from = 'Mocky <mocky@miguelmo.dev>';

  constructor(
    private readonly _configService: ConfigService,
    private readonly _translateService: TranslateService,
  ) {}

  public async sendConfirmEmail(account: Account, user: User) {
    const confirmationLink = `${this._configService.get('URL_FRONTEND')}/auth/confirm/${account.id}`;

    const language = user.language || 'en';

    return this.#resend.emails.send({
      from: this.#from,
      to: account.email,
      subject: this._translateService.get(language)['CONFIRM_EMAIL_SUBJECT'],
      html: await this.#getTemplate(EmailTemplate.ConfirmEmail, {
        confirmationLink,
        ...this._translateService.get(language),
      }),
    });
  }

  public async sendForgotPassword(account: Account, user: User) {
    const resetLink = `${this._configService.get('URL_FRONTEND')}/auth/reset-password/${account.hashForPasswordReset}`;

    const language = user.language || 'en';

    return this.#resend.emails.send({
      from: this.#from,
      to: account.email,
      subject: this._translateService.get(language)['FORGOT_PASSWORD_SUBJECT'],
      html: await this.#getTemplate(EmailTemplate.ForgotPassword, {
        resetLink,
        ...this._translateService.get(language),
      }),
    });
  }

  async #getTemplate(path: EmailTemplate, variables: Record<string, string>) {
    const dir = join(this.#dirName, path);

    const template = await readFile(dir, 'utf-8');

    return this.#replaceVariables(template, variables);
  }

  #replaceVariables(template: string, variables: Record<string, string>) {
    return Object.entries(variables).reduce(
      (acc, [key, value]) =>
        acc.replace(new RegExp(`{{ ${key} }}`, 'g'), value).replace(new RegExp(`{{${key}}}`, 'g'), value),
      template,
    );
  }
}
