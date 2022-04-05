import { TextField, IconButton, Tooltip } from '@mui/material';

import { toast } from 'react-toastify';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

// props: TextFieldprops
export default function TextFieldWithCopy(props) {
  const text = props.text;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    toast.info('Copied to clipboard');
  }
  
  return (
    <TextField {...props}
      value={text}
      InputProps={{
        readOnly: true,
        endAdornment: (
          <Tooltip title='Copy'>
            <IconButton onClick={copyToClipboard}>
              <ContentCopyIcon/>
            </IconButton>
          </Tooltip>
        )
      }}
    />
  )
}
