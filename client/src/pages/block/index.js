import { Container, Box } from '@mui/material';
import BlockDetailsContainer from './blockDetails';
import { useParams } from 'react-router-dom';

export default function BlockInfoPage() {
  const { blockIndex } = useParams();
  return (
    <Container maxWidth='md'>
      <Box marginTop={2} />
      <BlockDetailsContainer blockIndex={blockIndex} />
    </Container>
  );
}
