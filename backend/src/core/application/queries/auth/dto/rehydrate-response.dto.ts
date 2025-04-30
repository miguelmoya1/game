export class RehydrateResponseDto {
  public readonly token: string;

  private constructor(token: string) {
    this.token = token;
  }

  public static create(token: string) {
    return new RehydrateResponseDto(token);
  }
}
