import { ec as EC } from 'elliptic';
import sha256 from 'crypto-js/sha256';

export const ec = new EC();

export const hashDataSHA256 = (data) => {
  const strData = JSON.stringify(data);
  // The same as: crypto.createHash('sha256').update(strData).digest('hex');
  // But do not require nodejs's crypto module
  return sha256(strData).toString();
}
