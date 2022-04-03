import { Button, Dialog, DialogContent, Box } from '@mui/material';
import BootstrapDialogTitle from '../../../../../../_common/dialogs/_utils/bootstrapDialogTitle';
import SignInForm from './form';

function SignInDialog({ open, toggleClose, openSignUpDialog = () => {} }) {
  const handleClose = () => {
    toggleClose();
  };

  const handleOpenSignUpDialog = () => {
    handleClose();
    openSignUpDialog();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
      <BootstrapDialogTitle onClose={handleClose}>
        Đăng nhập
      </BootstrapDialogTitle>
      <DialogContent>
        <SignInForm />
        <Box mt={1}>
          <Box display='flex' flexDirection={'row-reverse'}>
            <Button color='defaultColor'>Quên mật khẩu?</Button>
          </Box>
          <Button fullWidth onClick={handleOpenSignUpDialog}>
            Chưa có tài khoản? Đăng ký
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default SignInDialog;
