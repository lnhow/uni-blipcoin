import api from '.';
import { getWalletInfo, signTransaction } from '../wallet';
const baseURI = '/transaction';

export const TRANSACTION_TYPE = {
  MINED: 2,
  PENDING: 1,
};

export const getAllTransactions = async (type = 0) => {
  let queryParam = '';
  if (type === TRANSACTION_TYPE.MINED) {
    queryParam = '?type=mined';
  } else if (type === TRANSACTION_TYPE.PENDING) {
    queryParam = '?type=mined';
  }

  const endpoint = `/transactions${queryParam}`;
  return api.get(endpoint);
};

export const getTransactionById = async (id = '') => {
  const endpoint = `${baseURI}/${id}`;
  return api.get(endpoint);
};

export const createTransaction = async (toAddress = '', amount = 0) => {
  const endpoint = `${baseURI}`;
  const address = getWalletInfo().address;
  const signature = signTransaction(toAddress, amount);

  const data = {
    signature,
    fromAddress: address,
    toAddress,
    amount,
  };

  return api.post(endpoint, data);
};

const TransactionAPI = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
};

export default TransactionAPI;
