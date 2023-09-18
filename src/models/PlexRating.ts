import { PlexThumbnail } from './PlexThumbnail';

export class PlexRating {
  public thumbnail: PlexThumbnail;

  constructor(
    public userRating: number,
    public audienceRating: number,
    public accountName: string,
    public tagline: string,
    public summary: string,
    public title: string,
    image: any,
  ) {
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
