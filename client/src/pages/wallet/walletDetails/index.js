import { useState, useEffect } from 'react';
import WalletAPI from '../../../helpers/api/wallet';
import TopBar from './topBar';
import WalletDetails from './walletDetails';

import { formatAxiosErrorResponse } from '../../../helpers/error';
import { INITIAL_WALLET_STATE } from './helper';

export default function WalletDetailsContainer({
  walletAddress = '0000',
}) {
  const [wallet, setWallet] = useState(INITIAL_WALLET_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadWallet(walletAddress);
  }, [walletAddress]);

  const loadWallet = (walletAddress) => {
    setWallet(INITIAL_WALLET_STATE);
    setIsLoading(true);
    setError(null);
    WalletAPI.getWalletInfoByAddress(walletAddress)
    .then((result) => {
      if (!result.data.success) {
        throw new Error(result.data.message);
      }
      const data = result.data.data;
      setWallet(data.wallet);
    })
    .catch(
      (error) => {
        let res = formatAxiosErrorResponse(error);
        setError(res);
      }
    )
    .finally(() => {
      setIsLoading(false);
    })
  }

  return (
    <>
      <TopBar 
        handleRefresh={() => {loadWallet(walletAddress)}}
      />
      <WalletDetails
        wallet={wallet}
        isLoading={isLoading}
        error={error}
      />
    </>
  )
}
