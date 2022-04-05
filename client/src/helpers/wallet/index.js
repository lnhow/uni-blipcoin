import reduxStore from '../../redux/store';
import { ec, hashDataSHA256 } from '../';

const getKeyPair = (privateKey = '') => {
  return ec.keyFromPrivate(privateKey);
}

export const genWalletInfo = () => {
  const keyPair = ec.genKeyPair();
  const wallet = {
    address: keyPair.getPublic('hex'),
    privateKey: keyPair.getPrivate('hex'),
  }
  return wallet;
}

export const getWalletInfo = () => {
  const EMPTY_WALLET = {
    address: 'empty',
    privateKey: 'empty',
  }
  const reduxState = reduxStore.getState() || {};
  const wallet = reduxState?.wallet || EMPTY_WALLET;
  return wallet;
};

export const getWalletInfoFromPrivate = (privateKey) => {
  const keyPair = getKeyPair(privateKey);
  const wallet = {
    address: keyPair.getPublic('hex'),
    privateKey: keyPair.getPrivate('hex'),
  }
  return wallet;
}

/**
 * Format transaction data correctly to the one used in server
 * @param {string} fromAddress 
 * @param {string} toAddress 
 * @param {string} amount 
 * @returns Formatted transaction data
 */
const formatTransactionData = (fromAddress, toAddress, amount) => {
  return {
    fromAddress: fromAddress,
    toAddress: toAddress,
    amount: amount,
  }
}

export const signTransaction = (toAddress, amount) => {
  const wallet = getWalletInfo();
  const key = wallet.privateKey;
  const keyPair = getKeyPair(key);

  const data = formatTransactionData(wallet.address, toAddress, amount);
  const hash = hashDataSHA256(data)

  const signature = keyPair.sign(hash, 'base64').toDER('hex');

  return signature;
};
