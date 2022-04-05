import { Container, Grid, Box, CircularProgress } from '@mui/material';

function Loader({ label = 'Loading' }) {
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
            <CircularProgress color='secondary' />
            <p>{label}</p>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Loader;
