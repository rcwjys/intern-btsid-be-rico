export class ValidationError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class UnAuthorize extends Error {
  constructor (message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class NotFound extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}