export interface IProcessEnv {
  discord: {
    token: string;
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
    },
    plex: {
      token: process.env.PLEX_AUTH_TOKEN ?? '',
    },
    server: {
      port: process.env.PORT ? Number(process.env.PORT) : 8080,
    },
  };
};
