import { EventEmitter } from 'events';

interface MockChannel {
  id: string;
  isTextBased: () => boolean;
  send: () => undefined;
}

interface MockChannelManager {
  cache: MockChannel[];
}

export class MockDiscordBot extends EventEmitter {
  constructor(channelId: string, isTextBased: boolean) {
    super();
    this.channels.cache.push({
      id: channelId,
      isTextBased: () => isTextBased,
      send: jest.fn(),
    });
  }

  login = jest.fn();

  channels: MockChannelManager = { cache: [] };
}
