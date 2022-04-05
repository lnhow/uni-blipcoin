import { Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

export default function DefaultActions() {
  return (
    <Stack direction='row' spacing={1}>
      <Button component={Link} to='/create-wallet' variant='outlined'>
        Create Wallet
      </Button>
      <Button component={Link} to='/access-wallet' variant='contained'>
        Access Wallet
      </Button>
    </Stack>
  );
}
