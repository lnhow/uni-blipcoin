import { 
  Paper, Typography,
  Box, Button
} from '@mui/material';
import { Link } from 'react-router-dom';
import CreateForm from './createForm';

export default function CreateDetails() {
  
  return (
    <Paper elevation={4}>
      <Box padding={2}>
        <Typography variant='h4' align='center'>Create wallet</Typography>
        <CreateForm/>
        <Box mt={2}>
          <Button 
            fullWidth size='small' 
            component={Link} 
            to={{ pathname: '/access-wallet' }}
          >
            Access wallet
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}
