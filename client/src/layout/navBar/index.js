import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import RightActions from './rightActions';

const NavTitle = styled(Typography)(() => ({
  textDecoration: 'none',
  color: 'inherit',
}));

function NavBar() {
  return (
    <>
      <AppBar color='background' position='static'>
        <Toolbar>
          <NavTitle component={Link} to='/'>
            <b>blipCoin</b>
          </NavTitle>
          <Box sx={{ flexGrow: 1 }} />
          <RightActions />
        </Toolbar>
      </AppBar>
    </>
  );
}

export default NavBar;
