import crypto from "crypto";

export const generateToken = (length: number) => {
  return new Promise<string>((resolve, reject) => {
    crypto.randomBytes(length, (err, buffer) => {
      if (err) {
        return reject(err);
      }

      const token = buffer.toString("hex");
      resolve(token);
    });
  });
};
