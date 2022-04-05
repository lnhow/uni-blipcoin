import {
  Paper, 
  Box, 
  Link,
  Typography,
  Stack,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import Loader from '../../../components/loader';
import { getLocalTimeFromTimestamp } from '../../../helpers/datetime';
import { INITIAL_BLOCK_STATE } from './helper';

export default function BlockDetails({
  index = 0,
  block = INITIAL_BLOCK_STATE,
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

  const metadata = block.metadata;
  const prevIndex = index - 1;
  const parentIndexDisplay = index > 0 ? (
    <Link 
      underline='hover'
      component={RouterLink} 
      to={`/block/${prevIndex}`}
    >
      {prevIndex}
    </Link>
  ) : '(None)';
  const minerAddress = metadata.miner ? (
    <Link 
      underline='hover'
      component={RouterLink} 
      to={`/wallet/${metadata.miner}`}
    >
      {metadata.miner}
    </Link>
  ) : '(none)';

  // const orderedBlocks = blocks.sort((block1, block2) => {
  //   return block2.timestamp - block1.timestamp;
  // });
  // const length = orderedBlocks.length;

  return (
    <Box>
      <Paper elevation={4}>
      <Box padding={1}>
        <Typography variant='h5'>
          <b>
            Block #{index}
          </b>
          {index === 0 ? <i> (Genesis block)</i> : ''}
        </Typography>
        <Typography noWrap variant='subtitle2'>
          <b>Miner:</b> {minerAddress}
        </Typography>
        <Typography noWrap variant='subtitle2'>
          <b>Hash:</b> {block.hash}
        </Typography>
        <Typography noWrap variant='subtitle2'>
          <b>Previous hash:</b> {block.prevHash}
        </Typography>
        <Typography noWrap variant='subtitle2'>
          <b>Parent block:</b> {parentIndexDisplay}
        </Typography>
        <Box marginTop={1}>
          <Typography variant='body2'>Metadata</Typography>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
          >
            <Typography variant='subtitle2'>
              <b>Transactions:</b> {block.transactions.length}
            </Typography>
            <Typography variant='subtitle2'>
              <b>Nonce:</b> {block.nonce}
            </Typography>
            <Typography variant='subtitle2'>
              <b>Difficulty:</b> {metadata.difficulty}
            </Typography>
            <Typography variant='subtitle2'>
              <b>Mine time:</b> {metadata.mineTime.toFixed(4)} ms
            </Typography>
            <Box>
              <Typography variant='subtitle2'><b>Timestamp:</b> {block.timestamp}</Typography>
              <Typography variant='caption'>
                <i>({getLocalTimeFromTimestamp(block.timestamp)}</i>)
              </Typography>
            </Box>
            
          </Stack>
        </Box>
        </Box>
      </Paper>
    </Box>
  )
}