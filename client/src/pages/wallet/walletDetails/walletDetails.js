import { Paper, Box, Typography } from '@mui/material';

import Loader from '../../../components/loader';
import TextFieldWithCopy from '../../../components/textFieldWithCopy';
import ErrorIndicator from '../../../components/errorIndicator';
import { INITIAL_WALLET_STATE } from './helper';
import WalletTransactions from './walletTransactions';

export default function WalletDetails({
  wallet = INITIAL_WALLET_STATE,
  error = null,
  isLoading = false,
}) {
  if (isLoading) {
    return (
      <Box>
        <Loader />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <ErrorIndicator message={error.message} />
      </Box>
    );
  }

  return (
    <>
      <Box>
        <Paper elevation={4}>
          <Box padding={1}>
            <Typography variant='h6'>Wallet</Typography>
            <TextFieldWithCopy
              margin='dense'
              size='small'
              fullWidth
              label='Address'
              text={wallet.address}
            />
            <Box padding={1}>
              <Typography noWrap variant='caption'>
                Balance
              </Typography>
              <Typography noWrap variant='h4' color='primary'>
                <b>{wallet.balance}</b>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
      <WalletTransactions
        walletAddress={wallet.address}
        transactions={wallet.transactions}
      />
    </>
  );
}
