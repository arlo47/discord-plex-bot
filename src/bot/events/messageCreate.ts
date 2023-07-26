import { Events, Message } from 'discord.js';

export const name: Events = Events.MessageCreate;

export const once: boolean = false;

export const execute = (message: Message) => {
  console.log('message event hit!');

  if (message.author.bot) {
    return;
  }

  message.channel.send('PONG');
};
