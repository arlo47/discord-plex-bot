import * as mediaRateEvent from '../../../../../src/bot/events/mediaRate';
import { DiscordEventName } from '../../../../../src/utils/constants';
import * as env from '../../../../../src/utils/config';
import { mockConfig } from '../../../../utils/config';
import { MockDiscordBot } from '../../../../utils/bot';
import { logger } from '../../../utils/logger/logger';
import { PlexRating } from '../../../../../src/models/PlexRating';
import { Logger } from 'winston';

describe('Testing mediaRate Event', () => {
  beforeEach(() => {
    jest.spyOn(env, 'getConfig').mockReturnValue(mockConfig);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should the correct event name', () => {
    expect(mediaRateEvent.name).toBe(DiscordEventName.Rate);
  });

  it('Should have a once property of type boolean', () => {
    expect(typeof mediaRateEvent.once).toBe('boolean');
  });

  describe('mediaRate execute', () => {
    it('Should throw if discord channelId is not a text channel', () => {
      const mockPlexRating = new PlexRating(
        10,
        10,
        'Mock Account',
        'Mock Media Rating',
        'mock summary',
        'mock title',
        undefined,
      );
      const mockLogger = logger as unknown as Logger;
      const mockClient: any = new MockDiscordBot(
        mockConfig.discord.channelId,
        false,
      );

      expect(() => {
        mediaRateEvent.execute(mockLogger, mockClient, mockPlexRating);
      }).toThrow();
    });

    it('Should execute with a plexRating without image', () => {
      const mockPlexRating = new PlexRating(
        10,
        10,
        'Mock Account',
        'Mock Media Rating',
        'mock summary',
        'mock title',
        undefined,
      );
      const mockLogger = logger as unknown as Logger;
      const mockClient: any = new MockDiscordBot(
        mockConfig.discord.channelId,
        true,
      );

      mediaRateEvent.execute(mockLogger, mockClient, mockPlexRating);
      const mockChannel = mockClient.channels.cache[0];

      expect(mockChannel.send).toBeCalledTimes(1);
      expect(mockChannel.send.mock.calls[0][0].files).toBe(undefined);
      expect(mockChannel.send.mock.calls[0][0].embeds[0].data.image).toBe(
        undefined,
      );
    });

    it('Should execute with a plexRating with image', () => {
      const mockPlexRating = new PlexRating(
        10,
        10,
        'Mock Account',
        'Mock Media Rating',
        'mock summary',
        'mock title',
        {
          buffer: Buffer.alloc(12345),
          encoding: 'test-encoding',
          fieldname: 'test-field-name',
          mimetype: 'test-mime-type',
          originalname: 'test-original-name',
          size: 9999,
        },
      );
      const mockLogger = logger as unknown as Logger;
      const mockClient: any = {
        channels: {
          cache: [
            {
              id: mockConfig.discord.channelId,
              isTextBased: () => true,
              send: jest.fn(),
            },
          ],
        },
      };

      mediaRateEvent.execute(mockLogger, mockClient, mockPlexRating);
      const mockChannel = mockClient.channels.cache[0];

      expect(mockChannel.send).toBeCalledTimes(1);
      expect(mockChannel.send.mock.calls[0][0].files.length).toBe(1);
      expect(mockChannel.send.mock.calls[0][0].embeds[0].data.image.url).toBe(
        'attachment://test-original-name',
      );
    });
  });
});
