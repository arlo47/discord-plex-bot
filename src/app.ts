import * as dotenv from 'dotenv';
dotenv.config();

import { Client, GatewayIntentBits } from 'discord.js';
import fs from 'fs';
import path from 'path';

import { getConfig } from './utils/config';
import server from './api/server';

const config = getConfig();

const client: Client = new Client({
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

server.listen(config.server.port, () => {
  console.log(`Server listening on ${config.server.port}`);
});
