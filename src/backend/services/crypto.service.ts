import * as crypto from "crypto";
import { cypherAlgorithm, cypherSeparator, hashAlgorithm, inputEncoding, outputEncoding } from "../../shared/constants";

export function hash(plainText: string): string {
  return crypto.createHash(hashAlgorithm).update(plainText).digest(outputEncoding);
}

export function encrypt(plainText: string, secret: string): string {
  const iv: Buffer = crypto.randomBytes(16);

  const cipher: crypto.CipherGCM = crypto.createCipheriv(cypherAlgorithm, Buffer.from(secret, outputEncoding), iv);

  let encryptedValue: string = cipher.update(plainText, inputEncoding, outputEncoding);
  encryptedValue += cipher.final(outputEncoding);

  return (
    iv.toString(outputEncoding) +
    cypherSeparator +
    encryptedValue +
    cypherSeparator +
    cipher.getAuthTag().toString(outputEncoding)
  );
}

export function decrypt(encryptedValue: string, secret: string): string {
  const parts: string[] = encryptedValue.split(cypherSeparator);

  const decipher: crypto.DecipherGCM = crypto.createDecipheriv(
    cypherAlgorithm,
    Buffer.from(secret, outputEncoding),
    Buffer.from(parts[0], outputEncoding),
  );
  decipher.setAuthTag(Buffer.from(parts[2], outputEncoding));

  return `${decipher.update(parts[1], outputEncoding, inputEncoding)}${decipher.final(inputEncoding)}`;
}
