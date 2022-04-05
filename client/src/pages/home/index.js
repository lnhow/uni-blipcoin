import { Container, Grid, Box } from '@mui/material';
import BlockListContainer from './blockList';
import TransactionListContainer from './transactionList';

export default function HomePage() {
  return (
    <Container maxWidth='lg'>
      <Box marginTop={2} />
      <Grid container spacing={2}>
        <Grid item lg={8} xs={12}>
          <BlockListContainer />
        </Grid>
        <Grid item lg={4} xs={12}>
          <TransactionListContainer />
        </Grid>
      </Grid>
    </Container>
  );
}
