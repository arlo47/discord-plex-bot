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
