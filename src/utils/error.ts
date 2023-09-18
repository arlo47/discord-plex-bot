export const ensureError = (value: unknown): Error => {
  if (value instanceof Error) {
    return value;
  }

  let stringifiedValue;

  try {
    stringifiedValue = JSON.stringify(value);
  } catch {
    stringifiedValue = 'Unable to stringify thrown value.';
  }

  return new Error(`Value thrown was not an error: ${stringifiedValue}`);
};
