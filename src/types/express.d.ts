export {};

declare global {
  namespace Express {
    export interface Request {
      logger: {
        info(log: any);
        error(log: any);
        warn(log: any);
        debug(log: any);
      };
    }
  }
}
