import { Container, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import WalletDetailsContainer from './walletDetails';

export default function WalletInfoPage() {
  const { walletAddress } = useParams();
  return (
    <Container maxWidth='md'>
      <Box marginTop={2}/>
      <WalletDetailsContainer walletAddress={walletAddress}/>
    </Container>
  )
}
