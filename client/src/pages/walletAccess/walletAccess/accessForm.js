import { useState } from 'react';
import { 
  Box, 
  Button,
  TextField,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { signIn } from '../../../redux/slices/wallet';
import { useHistory } from 'react-router-dom';

import * as yup from 'yup';
import { useFormik } from 'formik';
import { getWalletInfoFromPrivate } from '../../../helpers/wallet';

const validationSchema = yup.object({
  privateKey: yup
    .string('Input private key')
    .min(16, 'Minimum 16 characters')
    .required('Required')
});

export default function AccessForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [formStates, setFormStates] = useState({
    isSubmitting: false,
  });

  const handleSubmit = async (formValues) => {
    setFormStates({...formStates, isSubmitting: true});
    const key = formValues.privateKey;
    const walletInfo = getWalletInfoFromPrivate(key);
    dispatch(signIn(walletInfo));
    history.push('/');
  }

  const formik = useFormik({
    initialValues: {
      privateKey: ''
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box marginY={2}>
        <TextField
          autoFocus
          id='privateKey'
          name='privateKey'
          label='Private key'
          fullWidth
          value={formik.values.privateKey}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.privateKey)}
          helperText={formik.errors.privateKey || ' '}
        />
      </Box>
      <Box>
        <Button 
          variant='contained'
          fullWidth 
          type='submit'
        >
          Access
        </Button>
      </Box>
    </form>
  )
}
