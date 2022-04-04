import {
  Paper, 
  Box,
  Stack,
  Typography,
  Link,
  Button,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { getLocalTimeFromTimestamp } from '../../../helpers/datetime';

export default function BlockListItem({
  index = 0,
  block = {}
}) {
  const metadata = block.metadata;
  const minerAddress = metadata.miner ? (
    <Link 
      underline='hover'
      component={RouterLink} 
      to={`/wallet/${metadata.miner}`}
    >
      {metadata.miner}
    </Link>
  ) : '(none)';

  return (
    <Paper>
      <Box padding={1}>
        <Typography variant='body2'>
          <b>
            Block #
            <Link 
              underline='hover'
              component={RouterLink} 
              to={`/block/${index}`}
            >{index}</Link>
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
        <Button 
          fullWidth variant='outlined'
          component={RouterLink} to={`/block/${index}`}
        >
          Details
        </Button>
      </Box>
    </Paper>
  )
}
