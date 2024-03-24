import { PlexThumbnail } from './PlexThumbnail';

export class PlexRating {
  public thumbnail: PlexThumbnail | null = null;

  constructor(
    public userRating: number,
    public audienceRating: number,
    public accountName: string,
    public tagline: string,
    public summary: string,
    public title: string,
    image: any,
  ) {
    if (image) {
      this.thumbnail = new PlexThumbnail(
        image.buffer,
        image.encoding,
        image.fieldname,
        image.mimetype,
        image.originalname,
        image.size,
      );
    }
  }
}
