export class PlexThumbnail {
  public fieldName: string;
  public mimeType: string;
  public originalName: string;

  constructor(
    public buffer: Buffer,
    public encoding: string,
    fieldname: string,
    mimetype: string,
    originalname: string,
    public size: number,
  ) {
    this.fieldName = fieldname;
    this.mimeType = mimetype;
    this.originalName = originalname;
  }
}
