import { Channel, Client, EmbedBuilder } from 'discord.js';
import { getConfig } from '../../utils/config';
import { PlexRating } from '../../models/PlexRating';
import {
  formatUserRating,
  formatAudienceRating,
} from '../utils/ratingFormatter';
import { Logger } from 'winston';
import { ensureError } from '../../utils/error';

export const name: string = 'mediaRate';

export const once: boolean = false;

export const execute = (
  logger: Logger,
  client: Client,
  plexRating: PlexRating,
) => {
  try {
    const config = getConfig();

    const channel = client.channels.cache.find((c: Channel) => {
      return c.id === config.discord.channelId;
    });

    logger.info({
      message: 'Emitting Rating Event',
      rating: {
        title: plexRating.title,
        summary: plexRating.summary,
        userRating: plexRating.userRating,
        audienceRating: plexRating.audienceRating,
        accountName: plexRating.accountName,
      },
    });

    const mediaRateEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(plexRating.title)
      .setDescription(plexRating.summary)
      .addFields(
        {
          name: 'User Rating',
          value: formatUserRating(plexRating.userRating),
          inline: true,
        },
        {
          name: 'Audience Rating',
          value: formatAudienceRating(plexRating.audienceRating),
          inline: true,
        },
      )
      .addFields({ name: 'Rating By', value: plexRating.accountName })
      .setImage(`attachment://${plexRating.thumbnail?.originalName}`);

    if (channel?.isTextBased()) {
      channel.send({
        embeds: [mediaRateEmbed],
        // files: [
        //   {
        //     attachment: plexRating.thumbnail?.buffer,
        //     name: plexRating.thumbnail?.originalName,
        //   },
        // ],
      });
    }
  } catch (err: unknown) {
    const error: Error = ensureError(err);
    logger.error({
      message: 'Error Emitting Rating Event',
      error: { err: error.message, stack: error.stack },
    });
    throw error;
  }
};
