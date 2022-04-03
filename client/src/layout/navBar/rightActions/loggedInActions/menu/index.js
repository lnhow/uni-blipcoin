import { Menu, MenuItem } from '@mui/material';
import SignOutMenuItem from './signOutMenuItem';

export default function LoggedInMenu({
  anchorEl,
  open,
  handleClose = () => {},
}) {
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
      <MenuItem>Create transaction</MenuItem>
      <SignOutMenuItem/>
    </Menu>
  );
}
