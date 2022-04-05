import { Box, Typography, Grid } from '@mui/material';

import TransactionList from '../../../../components/transactionsList/transactionList';

export default function WalletTransactions({
  walletAddress = '0000',
  transactions = [],
}) {
  const receivedTransactions = transactions.filter((trans) => {
    return trans.toAddress === walletAddress;
  });
  const sentTransactions = transactions.filter((trans) => {
    return trans.fromAddress === walletAddress;
  });

  return (
    <>
      <Box marginTop={2} marginBottom={1}>
        <Typography variant='h6'>
          <b>Lastest wallet transactions</b>
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <Typography variant='subtitle1'>
            <b>Sent transactions</b>
          </Typography>
          <TransactionList transactions={sentTransactions} />
        </Grid>
        <Grid item md={6} xs={12}>
          <Typography variant='subtitle1'>
            <b>Received transactions</b>
          </Typography>
          <TransactionList transactions={receivedTransactions} />
        </Grid>
      </Grid>
    </>
  );
}
