import { Toolbar, IconButton, Typography, Stack, Box } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function TransactionListTopbar({ handleRefresh = () => {} }) {
  return (
    <Toolbar>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant='h6'>
          <b>Lastest transactions</b>
        </Typography>
      </Box>

      <Stack direction='row' spacing={1}>
        <IconButton onClick={handleRefresh}>
          <RefreshIcon />
        </IconButton>
      </Stack>
    </Toolbar>
  );
}
