import {
  Grid, Box, Typography
} from '@mui/material';
import Loader from '../../../components/loader';
import TransactionListItem from './transactionListItem';

export default function TransactionList({
  transactions = [], 
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

  const ordered = transactions.sort((trans1, trans2) => {
    return trans2.timestamp - trans1.timestamp;
  });

  return (
    <Box>
      <Grid container spacing={2}>
        {ordered.map((trans) => {
          return (
            <Grid
              key={trans.is}
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