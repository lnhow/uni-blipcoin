import { useState } from 'react';
import { Box, Button } from '@mui/material';
import TextFieldWithCopy from '../../../components/textFieldWithCopy';
import { genWalletInfo } from '../../../helpers/wallet';

const INITIAL_WALLET_INFO = {
  address: '',
  privateKey: '',
};

export default function CreateForm() {
  const [walletInfo, setWalletInfo] = useState(INITIAL_WALLET_INFO);

  const handleGenWalletInfo = () => {
    const newWallet = genWalletInfo();
    setWalletInfo({
      address: newWallet.address,
      privateKey: newWallet.privateKey,
    });
  };

  return (
    <>
      <Box marginY={2}>
        <TextFieldWithCopy
          margin='normal'
          fullWidth
          label='Wallet address'
          text={walletInfo.address}
          helperText={<span>Your wallet address</span>}
        />
        <TextFieldWithCopy
          margin='normal'
          fullWidth
          label='Private Key'
          text={walletInfo.privateKey}
          helperText={
            <span>
              Save this to <b>access your wallet</b> and <b>keep it safe</b>
            </span>
          }
        />
      </Box>
      <Box>
        <Button variant='contained' fullWidth onClick={handleGenWalletInfo}>
          Get wallet info
        </Button>
      </Box>
    </>
  );
}
