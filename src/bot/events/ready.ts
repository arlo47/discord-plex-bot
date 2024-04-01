import { Client } from 'discord.js';
import { logger } from '../../logger/logger';
import { DiscordEventName } from '../../utils/constants';

export const name: DiscordEventName = DiscordEventName.Ready;

export const once: boolean = false;

export const execute = (client: Client) => {
  logger.info({
    message: `Bot Initialized. Logged in as ${client?.user?.tag}!`,
  });
};
