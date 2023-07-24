export interface IProcessEnv {
  discord: {
    token: string;
  };
  server: {
    port: number;
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
    server: {
      port: process.env.PORT ? Number(process.env.PORT) : 8080,
    },
  };
};
