import { Client, Events } from 'discord.js';
import { logger } from '../../logger/logger';

export const name: Events = Events.ClientReady;

export const once: boolean = false;

export const execute = (client: Client) => {
  logger.info({
    message: `Bot Initialized. Logged in as ${client?.user?.tag}!`,
  });
};
