import {
  Button,
  CircularProgress,
  InputAdornment,
  IconButton,
} from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

import { useDispatch } from 'react-redux';
import { selfMakeSignIn } from '../../../../../../../../helpers/api/auth';
import { signIn } from '../../../../../../../../redux/slices/user';

import * as yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import CustomTextField from '../../../../../../../_common/utils/customTextField';
import { formatSignInResponse, handleSignInSuccess } from './helpers';
import { handleFailure } from '../../../../../../../../helpers/api/_helpers';

const validationSchema = yup.object({
  email: yup
    .string('Nhập email')
    .email('Email không hợp lệ')
    .required('Bắt buộc'),
  password: yup
    .string('Nhập mật khẩu')
    .min(8, 'Tối thiểu 8 ký tự')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      'Ít nhất một ký tự viết hoa, một ký tự viết thường, một chữ số và một ký tự đặc biệt(@#$%^&*)',
    )
    .required('Bắt buộc'),
});

export default function SignInForm({ onSuccess = () => {} }) {
  const [formStates, setFormStates] = useState({
    isSubmitting: false,
    showPassword: false,
  });

  const dispatch = useDispatch();

  const onSignInSuccess = (res) => {
    const resData = formatSignInResponse(res);
    setFormStates({ ...formStates, isSubmitting: false });

    dispatch(signIn(resData));
    handleSignInSuccess();
    onSuccess();
  };

  const onSignInFailure = (err) => {
    setFormStates({ ...formStates, isSubmitting: false });
    handleFailure(err);
  };

  const handleSubmit = async (formValues) => {
    setFormStates({ ...formStates, isSubmitting: true });
    const values = {
      ...formValues,
    };
    selfMakeSignIn(values).then(onSignInSuccess).catch(onSignInFailure);
  };
  const handleToggleShowPassword = () => {
    setFormStates({ ...formStates, showPassword: !formStates.showPassword });
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <CustomTextField
        fullWidth
        autoFocus
        id='email'
        name='email'
        label='Email'
        value={formik.values.email}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.email)}
        helperText={formik.errors.email}
      />
      <CustomTextField
        fullWidth
        type={formStates.showPassword ? 'text' : 'password'}
        id='password'
        name='password'
        label='Mật khẩu'
        endAdornment={
          <InputAdornment position='end'>
            <IconButton onClick={handleToggleShowPassword} edge='end'>
              {formStates.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        value={formik.values.password}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.password)}
        helperText={formik.errors.password}
      />
      <Button
        disabled={formStates.isSubmitting}
        variant='contained'
        fullWidth
        type='submit'
      >
        {formStates.isSubmitting ? (
          <CircularProgress color='inherit' />
        ) : (
          'Đăng nhập'
        )}
      </Button>
    </form>
  );
}
