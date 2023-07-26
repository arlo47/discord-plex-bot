import { Client, Events } from 'discord.js';

export const name: Events = Events.ClientReady;

export const once: boolean = false;

export const execute = (client: Client) => {
  console.log(`Logged in as ${client?.user?.tag}!`);
};
