import { Channel, Client, EmbedBuilder } from 'discord.js';
import { getConfig } from '../../utils/config';
import { PlexRating } from '../../models/PlexRating';

export const name: string = 'mediaRate';

export const once: boolean = false;

export const execute = (client: Client, plexRating: PlexRating) => {
  const config = getConfig();

  const channel = client.channels.cache.find((c: Channel) => {
    return c.id === config.discord.channelId;
  });

  console.log('=== in event ===');
  console.log(channel);

  const mediaRateEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(plexRating.title)
    .setDescription(plexRating.summary)
    .addFields(
      {
        name: 'User Rating',
        value: String(plexRating.userRating),
        inline: true,
      },
      {
        name: 'Audience Rating',
        value: String(plexRating.audienceRating),
        inline: true,
      },
    )
    .addFields({ name: 'Rating By', value: plexRating.accountName });

  if (channel?.isTextBased()) {
    channel.send({ embeds: [mediaRateEmbed] });
  }
};
