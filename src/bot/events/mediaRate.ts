import { Channel, Client, EmbedBuilder } from 'discord.js';
import * as env from '../../utils/config';
import { PlexRating } from '../../models/PlexRating';
import {
  formatUserRating,
  formatAudienceRating,
} from '../utils/ratingFormatter';
import { Logger } from 'winston';
import { ensureError } from '../../utils/error';
import { DiscordEventName } from '../../utils/constants';

interface MediaRatePayload {
  embeds: EmbedBuilder[];
  files?: { attachment: Buffer; name: string }[];
}

export const name: DiscordEventName = DiscordEventName.Rate;

export const once: boolean = false;

export const execute = (
  logger: Logger,
  client: Client,
  plexRating: PlexRating,
) => {
  try {
    const config = env.getConfig();

    const channelPlayload: MediaRatePayload = {
      embeds: [],
    };

    const channel = client.channels.cache.find((c: Channel) => {
      return c.id === config.discord.channelId;
    });

    if (!channel?.isTextBased()) {
      throw new Error(`Channel is not text based. Channel ID: ${channel?.id}`);
    }

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
      .addFields({ name: 'Rating By', value: plexRating.accountName });

    if (plexRating.thumbnail) {
      mediaRateEmbed.setImage(
        `attachment://${plexRating.thumbnail?.originalName}`,
      );
      channelPlayload.files = [
        {
          attachment: plexRating.thumbnail?.buffer,
          name: plexRating.thumbnail?.originalName,
        },
      ];
    }

    channelPlayload.embeds.push(mediaRateEmbed);
    channel.send(channelPlayload);
  } catch (err: unknown) {
    const error: Error = ensureError(err);

    logger.error({
      message: 'Error Emitting Rating Event',
      error: { err: error.message, stack: error.stack },
    });
  }
};
