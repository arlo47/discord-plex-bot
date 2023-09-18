import { ensureError } from './error';

describe('Testing ensureError', () => {
  it('Should return an error when value is a string', () => {
    const error: Error = ensureError('Something bad happened!');
    expect(error).toBeInstanceOf(Error);
  });

  it('Should return an error when value is an error', () => {
    const error: Error = ensureError(new Error('Something bad happened!'));
    expect(error).toBeInstanceOf(Error);
  });

  it('Should return an error when value cannot be stringified', () => {
    const bigInt = BigInt(
      '0b11111111111111111111111111111111111111111111111111111',
    );
    const error: Error = ensureError(bigInt);
    expect(error).toBeInstanceOf(Error);
  });
});
