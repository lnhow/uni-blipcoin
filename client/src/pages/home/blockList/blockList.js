import { Grid, Box, Typography } from '@mui/material';
import ErrorIndicator from '../../../components/errorIndicator';
import Loader from '../../../components/loader';
import BlockListItem from './blockListItem';

export default function BlockList({ blocks = [], error, isLoading }) {
  if (isLoading) {
    return (
      <Box>
        <Loader />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <ErrorIndicator message={error.message} />
      </Box>
    );
  }

  const orderedBlocks = blocks.sort((block1, block2) => {
    return block2.timestamp - block1.timestamp;
  });
  const length = orderedBlocks.length;

  return (
    <Box>
      <Grid container spacing={2}>
        {orderedBlocks.map((block, index) => {
          const blockIndex = length - index - 1;
          return (
            <Grid key={blockIndex} item xs={12}>
              <BlockListItem index={blockIndex} block={block} />
            </Grid>
          );
        })}
      </Grid>
      <Box
        sx={{
          margin: 1,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Typography variant='subtitle2' align='center'>
          (End of list)
        </Typography>
      </Box>
    </Box>
  );
}
