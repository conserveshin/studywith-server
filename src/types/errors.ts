export abstract class WrapperError extends Error {
  abstract statusCode: number;
}

export class InvalidParameterError extends WrapperError {
  override statusCode = 400;
}

export class LoginFailedError extends WrapperError {
  override message = "wrong username or password"
  override statusCode = 403;
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