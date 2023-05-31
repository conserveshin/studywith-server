export abstract class WrapperError extends Error {
  abstract statusCode: number;
}

export class NotFoundError extends WrapperError {
  override statusCode = 404;
}