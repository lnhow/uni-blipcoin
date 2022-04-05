import { Container, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { selectWallet } from '../../redux/slices/wallet';
import CreateTransactionContainer from './transactionCreate';

export default function TransactionCreatePage() {
  const wallet = useSelector(selectWallet);
  const walletAddress = wallet.address;

  if (!wallet.isLogin) {
    return (
      <Redirect to='/'/>
    )
  }

  return (
    <Container maxWidth='md'>
      <Box marginTop={2}/>
      <CreateTransactionContainer walletAddress={walletAddress}/>
    </Container>
  )
}
