import { useState } from 'react';
import { Button } from '@mui/material';

import LoggedInMenu from './menu';

export default function LoggedInActions() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button onClick={handleClick} variant='contained'>
        Wallet
      </Button>
      <LoggedInMenu open={open} anchorEl={anchorEl} handleClose={handleClose} />
    </>
  );
}
