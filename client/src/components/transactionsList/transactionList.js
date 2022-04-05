import {
  Grid, Box, Typography
} from '@mui/material';
import Loader from '../loader';
import TransactionListItem from './transactionListItem';
import ErrorIndicator from '../errorIndicator';

export default function TransactionList({
  transactions = [], 
  error = null, 
  isLoading = false, 
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
        <ErrorIndicator message={error.message}/>
      </Box>
    )
  }

  const ordered = transactions.sort((trans1, trans2) => {
    return trans2.timestamp - trans1.timestamp;
  });

  return (
    <Box>
      <Grid container spacing={2}>
        {ordered.map((trans) => {
          return (
            <Grid
              key={trans.id}
              item
              xs={12}
            >
              <TransactionListItem data={trans}/>
            </Grid>)
        })}
      </Grid>
      <Box sx={{
          margin: 2,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
          <Typography variant='subtitle2' align='center'>(End of list)</Typography>
        </Box>
    </Box>
  )
}