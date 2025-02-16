export class LoginEmailCreatedEvent {
  constructor(
    public readonly accountId: string,
    public readonly userId: string,
  ) {}
}
