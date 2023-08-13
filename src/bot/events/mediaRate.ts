import { Channel, Client } from 'discord.js';
import { PlexRateEvent } from '../../types/plex';
import { getConfig } from '../../utils/config';

export const name: string = 'mediaRate';

export const once: boolean = false;

export const execute = (client: Client, plexRating: PlexRateEvent) => {
  console.log('Media Rate Hit!');
  const config = getConfig();

  const channel = client.channels.cache.find((c: Channel) => {
    return c.id === config.discord.channelId;
  });

  if (channel?.isTextBased()) {
    channel.send('Media Rate!');
  }
};
