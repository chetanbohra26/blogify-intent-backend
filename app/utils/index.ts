export const generateOtp = (length: number = 6): string => {
  if (length < 1 || !Number.isInteger(length)) {
    throw new Error('Length must be a positive integer');
  }

  // Using crypto for secure random numbers
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const crypto = require('crypto');

  // Create a numeric string of specified length
  let otp = '';

  // Generate random bytes
  const buffer = crypto.randomBytes(Math.ceil(length / 2));

  // Convert bytes to numbers and build OTP
  for (let i = 0; i < length; i++) {
    // Use modulo 10 to ensure we get single digits
    otp += Math.floor((buffer[i] || buffer[0]) % 10);
  }

  return otp;
};

export const slugify = (str: string) => {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
  const to = 'aaaaeeeeiiiioooouuuunc------';
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
}
