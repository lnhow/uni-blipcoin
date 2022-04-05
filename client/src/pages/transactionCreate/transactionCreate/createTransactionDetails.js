import { Paper, Box, Typography } from '@mui/material';
import ErrorIndicator from '../../../components/errorIndicator';

import Loader from '../../../components/loader';
import TextFieldWithCopy from '../../../components/textFieldWithCopy';
import { INITIAL_WALLET_STATE } from './helper';

export default function CreateTransactionDetails({
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
  );
}
