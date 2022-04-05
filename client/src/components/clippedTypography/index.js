import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const ClippedTypography = styled(Typography)(() => ({
  wordWrap: 'break-word',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2, //max num of lines to show
  WebkitBoxOrient: 'vertical',
}));

export default ClippedTypography;
