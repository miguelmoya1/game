export class LoginWithEmailCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}
