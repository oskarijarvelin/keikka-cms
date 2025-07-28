import { msFormatter, formatAjankohta, capitalizeFirstLetter } from '../functions';

describe('msFormatter', () => {
  test('converts milliseconds to hours string', () => {
    expect(msFormatter(7200000)).toBe('2');
  });

  test('returns 0 for null', () => {
    expect(msFormatter(null)).toBe(0);
  });

  test('returns 0 for undefined', () => {
    expect(msFormatter(undefined)).toBe(0);
  });
});

describe('formatAjankohta', () => {
  test('single day format when dates match', () => {
    const time = Date.parse('2024-01-01T00:00:00Z');
    expect(formatAjankohta(time, time)).toBe('1.1.2024');
  });

  test('same month date range', () => {
    const start = Date.parse('2024-01-01T00:00:00Z');
    const end = Date.parse('2024-01-05T00:00:00Z');
    expect(formatAjankohta(start, end)).toBe('1.–5.1.2024');
  });

  test('cross-month date range', () => {
    const start = Date.parse('2024-03-31T00:00:00Z');
    const end = Date.parse('2024-04-02T00:00:00Z');
    expect(formatAjankohta(start, end)).toBe('31.3.–2.4.2024');
  });

  test('returns "Invalid date" for null values', () => {
    expect(formatAjankohta(null, null)).toBe('Invalid date');
  });

  test('returns "Invalid date" for undefined values', () => {
    expect(formatAjankohta(undefined, undefined)).toBe('Invalid date');
  });
});

describe('capitalizeFirstLetter', () => {
  test('capitalizes first letter of string', () => {
    expect(capitalizeFirstLetter('hello')).toBe('Hello');
  });

  test('returns empty string when given empty string', () => {
    expect(capitalizeFirstLetter('')).toBe('');
  });

  test('throws error for null', () => {
    expect(() => capitalizeFirstLetter(null)).toThrow();
  });

  test('throws error for undefined', () => {
    expect(() => capitalizeFirstLetter(undefined)).toThrow();
  });
});
