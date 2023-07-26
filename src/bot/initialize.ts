import { Client, GatewayIntentBits } from 'discord.js';
import fs from 'fs';
import path from 'path';

import { getConfig } from '../utils/config';

const config = getConfig();

let client: Client;

export const getClient = (): Client => {
  return client;
};

export const initializeBot = () => {
  client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
  });

  const eventsPath = path.join(__dirname, 'events');
  const eventFiles = fs.readdirSync(eventsPath).filter((file) => {
    return file.endsWith('.js') || file.endsWith('.ts');
  });

  eventFiles.forEach(async (file) => {
    const filePath = path.join(eventsPath, file);
    const { name, once, execute } = await import(filePath);

    if (once) {
      client.once(name, (...args) => {
        execute(...args);
      });
    } else {
      client.on(name, (...args) => {
        execute(...args);
      });
    }
  });

  client.login(config.discord.token);
};
