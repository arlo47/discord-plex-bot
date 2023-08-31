import { formatAudienceRating, formatUserRating } from './ratingFormatter';

describe('Testing ratingFormatter', () => {
  describe('Testing formatUserRating', () => {
    it('Should return string 5 star rating for rating of 10', () => {
      const rating = formatUserRating(10);
      expect(rating).toMatch(/5/);
    });

    it('Should return string 2.5 star rating for rating of 5', () => {
      const rating = formatUserRating(5);
      expect(rating).toMatch(/2.5/);
    });

    it('Should return 0 star rating for rating of 0', () => {
      const rating = formatUserRating(0);
      expect(rating).toMatch(/0/);
    });
  });

  describe('Testing formatAudienceRating', () => {
    it('Should return string 100% for rating of 10', () => {
      const rating = formatAudienceRating(10);
      expect(rating).toMatch(/100%/);
    });

    it('Should return string 56% for rating of 5.6', () => {
      const rating = formatAudienceRating(5.6);
      expect(rating).toMatch(/56%/);
    });

    it('Should return string 0% for rating of 0', () => {
      const rating = formatAudienceRating(0);
      expect(rating).toMatch(/0%/);
    });
  });
});
