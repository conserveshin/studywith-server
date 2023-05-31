export abstract class WrapperError extends Error {
  abstract statusCode: number;
}

export class DatabaseConnectionFailedError extends WrapperError {
  override statusCode = 503;
}

export class DatabaseQueryFailedError extends WrapperError {
  override statusCode = 500;
}

export class NotFoundError extends WrapperError {
  override statusCode = 404;
}