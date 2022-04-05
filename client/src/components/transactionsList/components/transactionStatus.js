import { Typography } from '@mui/material';

export default function TransactionStatus({ transactionStatus = null }) {
  if (!transactionStatus) {
    return <></>;
  }
  return (
    <Typography variant='subtitle2'>
      <b>Status:</b> {transactionStatus}
    </Typography>
  );
}
