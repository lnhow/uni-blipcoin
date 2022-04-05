import { Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function TransactionBlockInfo({ blockIndex = null }) {
  if (!blockIndex) {
    return <></>;
  }
  return (
    <Typography variant='subtitle2'>
      <b>Block: </b>
      <Link
        underline='hover'
        component={RouterLink}
        to={`/block/${blockIndex}`}
      >
        {blockIndex}
      </Link>
    </Typography>
  );
}
