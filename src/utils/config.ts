export interface IProcessEnv {
  discord: {
    token: string;
    channelId: string;
  };
  server: {
    port: number;
    environment: string;
  };
  plex: {
    tokens: string[];
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
      tokens: process.env.PLEX_AUTH_TOKENS
        ? JSON.parse(process.env.PLEX_AUTH_TOKENS)
        : [],
    },
    server: {
      port: process.env.PORT ? Number(process.env.PORT) : 8080,
      environment: process.env.SERVER_ENVRIONMENT ?? 'UNKNOWN',
    },
  };
};
