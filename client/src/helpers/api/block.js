import api from '.';
const baseURI = '/block';

export const getAllBlock = async () => {
  const endpoint = '/blocks';
  return api.get(endpoint);
}

export const getBlockByIndex = async (index) => {
  const endpoint = `${baseURI}/${index}`;
  return api.get(endpoint);
}

export const triggerMineNewBlock = async () => {
  const endpoint = `${baseURI}/mine`;
  const data = {};
  return api.post(endpoint, data);
}
