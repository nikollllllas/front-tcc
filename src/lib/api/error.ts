export class ApiError extends Error {
  public readonly status: number;
  public readonly code: number;
  public readonly details?: string[];

  constructor(
    message: string,
    status: number,
    code: number,
    details?: string[],
  ) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }

  hasDatails(): boolean {
    return this.details !== undefined;
  }
}
