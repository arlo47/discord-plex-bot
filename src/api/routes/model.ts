import { PlexRating } from '../../models/PlexRating';
import { PlexRateEvent } from '../../types/plex';
import { getClient } from '../../bot/initialize';
import { Client } from 'discord.js';
import { Logger } from 'winston';
import { FilePayload } from '../../types/express';

export const processRatingWebHook = (
  logger: Logger,
  payload: PlexRateEvent,
  name: string | undefined,
  image: FilePayload | undefined,
) => {
  try {
    const plexRating = new PlexRating(
      payload.Metadata.userRating,
      payload.Metadata.audienceRating,
      name ?? payload.Account.title,
      payload.Metadata.tagline,
      payload.Metadata.summary,
      payload.Metadata.title,
      image,
    );

    const discordClient: Client = getClient();
    discordClient.emit('mediaRate', logger, discordClient, plexRating);
  } catch (error: any) {
    logger.error({
      message: 'Error in processRatingWebHook',
      error: { err: error.message, stack: error.stack },
    });
    throw Error(error);
  }
};
