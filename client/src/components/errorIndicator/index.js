import { Container, Grid, Box } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

export default function ErrorIndicator({ message = 'Error' }) {
  return (
    <Container>
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justifyContent='center'
      >
        <Grid item xs={3}>
          <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='enter'
            marginTop={2}
          >
            <ErrorIcon />
            <p>{message}</p>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
