import { PlexRating } from '../../models/PlexRating';
import { PlexRateEvent } from '../../types/plex';
import { getClient } from '../../bot/initialize';
import { Client } from 'discord.js';

export const processRatingWebHook = (
  payload: PlexRateEvent,
  name: string | undefined,
) => {
  try {
    const plexRating = new PlexRating(
      payload.Metadata.userRating,
      payload.Metadata.audienceRating,
      name ?? payload.Account.title,
      payload.Metadata.tagline,
      payload.Metadata.summary,
      payload.Metadata.title,
    );

    console.log('=== init PlexRating ===');
    console.log(plexRating);

    const discordClient: Client = getClient();
    discordClient.emit('mediaRate', discordClient, plexRating);
    console.log(plexRating);
  } catch (error: any) {
    console.log({ err: error.message, stack: error.stack });
    throw Error(error);
  }
};
