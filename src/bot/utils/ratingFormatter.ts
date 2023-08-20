/**
 * userRating is returned as an int from 1 to 10,
 * where each number represents a half star. Converts the int
 * userRating into the float of star rating
 */
export const formatUserRating = (userRating: number): string => {
  try {
    const starRating = userRating / 2;
    return `${starRating} stars`;
  } catch (error: any) {
    console.log({ error: error.message, stack: error.stack });
    throw Error(error);
  }
};

/**
 * audienceRating is returned as a float.
 * Converts audienceRating to a percentage.
 */
export const formatAudienceRating = (audienceRating: number): string => {
  try {
    const percentageRating = audienceRating * 10;
    return `${percentageRating}%`;
  } catch (error: any) {
    console.log({ error: error.message, stack: error.stack });
    throw Error(error);
  }
};
