import { Container, Grid, Box } from '@mui/material';
import BlockListContainer from './blockList';


export default function HomePage() {
  return (
    <Container maxWidth='lg'>
      <Box marginTop={2}/>
      <Grid container>
        <Grid item lg={8} xs={12}>
          <BlockListContainer/>
        </Grid>
      </Grid>
    </Container>
  )
}
