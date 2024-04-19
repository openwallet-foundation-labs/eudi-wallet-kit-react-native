export class InvalidDataError extends Error {
  public data: unknown

  public constructor(message?: string, data?: unknown) {
    super(message)
    this.data = data
  }
}
