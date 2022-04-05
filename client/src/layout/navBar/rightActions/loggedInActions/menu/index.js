import { useSelector } from 'react-redux';
import { selectWallet } from '../../../../../redux/slices/wallet';

import { ListItem, ListItemText, Menu, MenuItem } from '@mui/material';
import SignOutMenuItem from './signOutMenuItem';
import { Link } from 'react-router-dom';

export default function LoggedInMenu({
  anchorEl,
  open,
  handleClose = () => {},
}) {
  const wallet = useSelector(selectWallet);
  const address = wallet.address;

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <ListItem>
        <ListItemText
          primary='Wallet'
          secondary={address}
          sx={{
            overflow: 'hidden',
            maxWidth: '24ch',
          }}
        />
      </ListItem>
      <MenuItem component={Link} to={`/wallet/${address}`}>
        My wallet
      </MenuItem>
      <MenuItem component={Link} to='/create-transaction'>
        Create transaction
      </MenuItem>
      <SignOutMenuItem/>
    </Menu>
  );
}
