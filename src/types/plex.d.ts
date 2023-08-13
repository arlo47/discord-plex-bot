import { PlexWebhookEvent } from '../utils/constants';

export type PlexRateEvent = {
  event: PlexMediaEventType;
  Account: {
    title: string;
  };
  Metadata: {
    userRating: number;
    audienceRating: number;
    tagline: string;
    summary: string;
    title: string;
  };
};

export type PlexMediaEventType = `${PlexWebhookEvent}`;
