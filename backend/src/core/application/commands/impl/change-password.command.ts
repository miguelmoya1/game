export class ChangePasswordCommand {
  constructor(
    public readonly hashForPasswordReset: string,
    public readonly password: string,
  ) {}
}
