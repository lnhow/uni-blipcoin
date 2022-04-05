import {
  Toolbar, IconButton, Stack, Box, 
  Button,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Link as RouterLink } from 'react-router-dom';

export default function TopBar({
  handleRefresh = () => {},
}) {
  return (
    <Toolbar>
      <Box sx={{flexGrow: 1}}>
        <Button component={RouterLink} to='/'>
          Back
        </Button>
      </Box>
      
      <Stack direction='row' spacing={1}>
        <IconButton
          onClick={handleRefresh}
        >
          <RefreshIcon/>
        </IconButton>
      </Stack>
    </Toolbar>

  )
}
