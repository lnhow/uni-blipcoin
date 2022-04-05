import { 
  Paper, Typography,
  Box, Button
} from '@mui/material';
import { Link } from 'react-router-dom';
import AccessForm from './accessForm';

export default function WalletAccess() {
  return (
    <Paper elevation={4} sx={{width: '360px'}}>
      <Box padding={2}>
        <Typography variant='h4' align='center'>Access wallet</Typography>
        <AccessForm/>
        <Box mt={2}>
          <Button 
            fullWidth size='small' 
            component={Link} 
            to={{ pathname: '/create-wallet' }}
          >
            Don't have a wallet? Create
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}
