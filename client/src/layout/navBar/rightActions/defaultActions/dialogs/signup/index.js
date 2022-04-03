import { Button, Dialog, DialogContent, Box } from '@mui/material';
import BootstrapDialogTitle from '../../../../../../_common/dialogs/_utils/bootstrapDialogTitle';
import SignUpForm from './form';

function SignUpDialog({ open, toggleClose, openSignInDialog = () => {} }) {
  const handleClose = () => {
    toggleClose();
  };

  const handleOpenSignInDialog = () => {
    handleClose();
    openSignInDialog();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
      <BootstrapDialogTitle onClose={handleClose}>
        Đăng nhập
      </BootstrapDialogTitle>
      <DialogContent>
        <SignUpForm onSuccess={handleOpenSignInDialog} />
        <Box mt={1}>
          <Button fullWidth onClick={handleOpenSignInDialog}>
            Đã có tài khoản? Đăng nhập
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default SignUpDialog;
