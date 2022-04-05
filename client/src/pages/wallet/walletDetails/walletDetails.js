import {
  Paper, 
  Box, 
  Typography,
} from '@mui/material';

import Loader from '../../../components/loader';
import { INITIAL_WALLET_STATE } from './helper';

export default function WalletDetails({
  index = 0,
  wallet = INITIAL_WALLET_STATE,
  error = null, 
  isLoading = false, 
}) {
  if (isLoading) {
    return (
      <Box>
        <Loader/>
      </Box>
    )
  }

  if (error) {
    return (
      <Box>
        {error.message}
      </Box>
    )
  }

  return (
    <Box>
      <Paper elevation={4}>
        <Box padding={1}>
          <Typography variant='h6'>
            Wallet
          </Typography>
          <Typography noWrap variant='subtitle2'>
            <b>Address:</b> {wallet.address}
          </Typography>
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
  )
}