import * as mediaRateEvent from '../../../../../src/bot/events/mediaRate';
import { DiscordEventName } from '../../../../../src/utils/constants';
import * as env from '../../../../../src/utils/config';
import { mockConfig } from '../../../../utils/config';

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
});
