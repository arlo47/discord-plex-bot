export enum ResponseMessage {
  Unauthorized = 'Unauthorized.',
  GenericError = 'An error occured.',
  Success = 'Success.',
  NotFound = 'Endpoint not found.',
}

export enum PlexWebhookEvent {
  Rate = 'media.rate',
  Pause = 'media.pause',
  Play = 'media.play',
}

export enum DiscordEventName {
  Rate = 'mediaRate',
  Ready = 'ready',
}

const IMAGE = 'image';

export enum ImageMimeType {
  Jpeg = `${IMAGE}/jpeg`,
  Png = `${IMAGE}/png`,
  Gif = `${IMAGE}/gif`,
}
