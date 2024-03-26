export const getMockClient = (channelId: string, isTextChannel: boolean) => {
  return {
    channels: {
      cache: [
        {
          id: channelId,
          isTextBased: () => isTextChannel,
          send: jest.fn(),
        },
      ],
    },
  };
};
