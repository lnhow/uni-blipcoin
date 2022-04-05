import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function DefaultActions() {
  return (
    <>
      <Button component={Link} to='/create-wallet'>
        Create Wallet
      </Button>
      <Button component={Link} to='/access-wallet'>
        Access Wallet
      </Button>
    </>
  );
}
