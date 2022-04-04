import api from '.';
const baseURI = '/wallet';

export const getWalletInfoByAddress = async (address = '') => {
  const endpoint = `${baseURI}/${address}`;
  return api.get(endpoint);
}
