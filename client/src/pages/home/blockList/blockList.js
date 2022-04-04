import {
  Grid, Box, Typography
} from '@mui/material';
import Loader from '../../../components/loader';
import BlockListItem from './blockListItem';

export default function BlockList({
  blocks = [], 
  error, 
  isLoading, 
}) {
  if (isLoading) {
    return (
      <Box>
        <Loader/>
      </Box>
    )
  }

  if (error) {
    return (
      <Box>
        {error.message}
      </Box>
    )
  }

  return (
    <Box>
      <Grid container spacing={2}>
        {blocks.map((block, index) => (
          <Grid
            key={index}
            item
            xs={12}
          >
            <BlockListItem index={index} block={block}/>
          </Grid>
        ))}
      </Grid>
      <Box sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
          <Typography align='center'>(End of list)</Typography>
        </Box>
    </Box>
  )
}