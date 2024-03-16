export class ServerError extends Error {
  errorType: string;
  message: string;
  status: number;

  constructor(message: string, status: number = 500) {
    super(`Server Error: ${message}.`);

    this.errorType = 'server';
    this.message = message;
    this.status = status;
  }
}