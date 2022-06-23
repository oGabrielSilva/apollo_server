import type { Response } from 'express';

class BadRequest {
  constructor(
    private readonly response: Response,
    private readonly status = 404,
    private readonly message = 'the request sent to the server is invalid or corrupted',
    private readonly code = 'BAD_REQUEST',
  ) {}

  public dispatch(): Response {
    return this.response
      .status(this.status)
      .json({ code: this.code, message: this.message, status: this.status });
  }
}

export default BadRequest;
