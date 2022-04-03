import { MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signOut } from '../../../../../../redux/slices/wallet';

export default function SignOutMenuItem({ onAfterClicked = () => {} }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignOut = () => {
    dispatch(signOut());
    history.push('/');
    onAfterClicked();
  };

  return <MenuItem onClick={handleSignOut}>Sign out</MenuItem>;
}
