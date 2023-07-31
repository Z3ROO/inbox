export class ClientError extends Error {
  errorType: string;
  message: string;
  status: number;

  constructor(message: string, status?: number) {
    super(`Client Error: ${message}.`);

    this.errorType = 'client';
    this.message = message;
    this.status = status;
  }
}