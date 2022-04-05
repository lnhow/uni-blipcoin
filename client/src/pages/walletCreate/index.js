import { 
  Container, 
  Box,
  Grid,
} from '@mui/material';
import CreateDetails from './walletCreateDetails';

export default function WalletCreatePage() {
  return (
    <Container maxWidth='md'>
      <Box marginTop={2}/>
      <Grid
        container
        spacing={0}
        // Center horizontal & vertical inner element
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '80vh' }} //Parent content area min height
      >
        <Grid item xs={3}>
          <CreateDetails/>
        </Grid>
      </Grid>
      
    </Container>
  )
}
