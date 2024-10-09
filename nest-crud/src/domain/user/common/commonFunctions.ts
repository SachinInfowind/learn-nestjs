import * as bcrypt from 'bcryptjs';
import { Readable } from 'typeorm/platform/PlatformTools';
import * as csv from 'csv-parser';
export const encryptedValue = (value: string) => {
  const encrytedValue = bcrypt.hashSync(value, 5);
  return encrytedValue;
};

export const comparePassword = (
  password: string,
  hashedPassword: string,
): boolean => {
  const status = bcrypt.compareSync(password, hashedPassword);
  return status;
};

export async function parseCsv(buffer: Buffer) {
  try {
    const results = [];
    const stream = Readable.from(buffer.toString());
    await new Promise<void>((resolve, reject) => {
      stream
        .pipe(csv())
        .on('data', (data) => {
          results.push(data); // Collect each parsed row
        })
        .on('end', () => {
          resolve(); // Resolve once the stream finishes
        })
        .on('error', (error) => {
          reject(error); // Handle any stream errors
        });
    });
    return results;
  } catch (error) {
    console.log(error);
  }
}
