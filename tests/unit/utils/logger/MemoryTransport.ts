import Transport from 'winston-transport';

export const logs: any = [];

export class MemoryTransport extends Transport {
  constructor() {
    super();
  }

  log(info: any, cb: () => void) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    logs.push(info);
    cb();
  }
}
