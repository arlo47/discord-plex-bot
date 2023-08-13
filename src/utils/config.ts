export interface IProcessEnv {
  discord: {
    token: string;
    channelId: string;
  };
  server: {
    port: number;
  };
  plex: {
    token: string;
  };
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends IProcessEnv {}
  }
}

export const getConfig = (): IProcessEnv => {
  return {
    discord: {
      token: process.env.DISCORD_TOKEN ?? '',
      channelId: process.env.DISCORD_RATING_CHANNEL_ID ?? '',
    },
    plex: {
      token: process.env.PLEX_AUTH_TOKEN ?? '',
    },
    server: {
      port: process.env.PORT ? Number(process.env.PORT) : 8080,
    },
  };
};
