export {};

import type { Logger } from 'winston';

declare global {
  namespace Express {
    export interface Request {
      logger: Logger;
    }
  }
}

export interface FilePayload {
  buffer: Buffer;
  encoding: string;
  fieldname: string;
  mimetype: string;
  originalname: string;
  size: number;
}
