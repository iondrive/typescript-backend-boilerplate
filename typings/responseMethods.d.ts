declare type DataResponse = {} | {}[];

interface ErrorResponse {
  name?: string;
  code?: string;
  message?: string;
  description?: string;
  errors?: {
    name?: string;
    code?: string;
    field?: string;
    message?: string;
  }[];
}

declare module Express {
  interface Request {
    auth: { type: string, sub: string, orgId?: string };
  }

  interface Response {
    sendData(status: number, data: DataResponse): void;
    sendData(data: DataResponse): void;
    sendData(status: number): void;

    ok(data: DataResponse): void;
    ok(): void;

    sendError(status: number, err: ErrorResponse): void;
    sendError(err: ErrorResponse): void;
    sendError(status: number): void;

    badRequest(error: ErrorResponse): void;
    badRequest(): void;
    unauthorized(error: ErrorResponse): void;
    unauthorized(): void;
    forbidden(error: ErrorResponse): void;
    forbidden(): void;
    notFound(error: ErrorResponse): void;
    notFound(): void;
    conflict(error: ErrorResponse): void;
    conflict(): void;
    authenticationTimeout(error: ErrorResponse): void;
    authenticationTimeout(): void;
    tooManyRequests(error: ErrorResponse): void;
    tooManyRequests(): void;
    internalServerError(error: ErrorResponse): void;
    internalServerError(): void;

    jwt(type: string, subject: string, payload?: {}): void;
  }
}