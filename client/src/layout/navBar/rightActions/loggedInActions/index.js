import { useState } from 'react';
import { Button } from '@mui/material';

import { useSelector } from 'react-redux';
import { selectWallet } from '../../../../redux/slices/wallet';
import LoggedInMenu from './menu';

export default function LoggedInActions() {
  const wallet = useSelector(selectWallet);
  const address = wallet.adress;

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
      <Button onClick={handleClick}>
        {address}
      </Button>
      <LoggedInMenu open={open} anchorEl={anchorEl} handleClose={handleClose} />
    </>
  );
}
