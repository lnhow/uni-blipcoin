import { ec as EC } from 'elliptic';
import crypto from 'crypto';

export const ec = new EC();

export const hashDataSHA256 = (data) => {
  const strData = JSON.stringify(data);
  return crypto.createHash('sha256').update(strData).digest('hex');
}
