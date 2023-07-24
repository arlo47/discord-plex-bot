import * as dotenv from 'dotenv';
dotenv.config();

import { Client, GatewayIntentBits, Events, Message } from 'discord.js';

import { getConfig } from './utils/config';

const config = getConfig();

const client: Client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.on(Events.ClientReady, () => {
  console.log(`Logged in as ${client?.user?.tag}!`);
});

client.on(Events.MessageCreate, async (message: Message) => {
  console.log('message event hit!');

  if (message.author.bot) {
    return;
  }

  message.channel.send('PONG');
});

client.login(config.discord.token);
