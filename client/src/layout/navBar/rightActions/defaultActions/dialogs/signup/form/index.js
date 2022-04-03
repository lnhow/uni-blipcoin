import {
  Button,
  CircularProgress,
  InputAdornment,
  IconButton,
  Typography,
} from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

import * as yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import CustomTextField from '../../../../../../../_common/utils/customTextField';
import { handleFailure } from '../../../../../../../../helpers/api/_helpers';
import { handleSignUp } from '../../../../../../../../helpers/api/user';
import { handleSignUpSuccess } from './helpers';

const validationSchema = yup.object({
  email: yup
    .string('Nhập email')
    .email('Email không hợp lệ')
    .required('Bắt buộc'),
  fullname: yup.string('Nhập họ và tên').required('Bắt buộc'),
  contact_number: yup
    .string('Nhập SĐT')
    .matches(
      /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
      'Số điện thoại không hợp lệ',
    )
    .required('Bắt buộc'),
  password: yup
    .string('Nhập mật khẩu')
    .min(8, 'Tối thiểu 8 ký tự')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      'Ít nhất một ký tự viết hoa, một ký tự viết thường, một chữ số và một ký tự đặc biệt(@#$%^&*)',
    )
    .required('Bắt buộc'),
  passwordConfirm: yup
    .string('Xác nhận mật khẫu')
    .required('Bắt buộc')
    .oneOf([yup.ref('password')], 'Không khớp với mật khẩu'),
});

export default function SignUpForm({ onSuccess = () => {} }) {
  const [formStates, setFormStates] = useState({
    isSubmitting: false,
    showPassword: false,
    showPasswordConfirm: false,
  });

  const handleSubmit = async (formValues) => {
    const values = {
      ...formValues,
    };
    console.log(values);
    setFormStates({ ...formStates, isSubmitting: true });
    handleSignUp(values)
      .then(() => {
        handleSignUpSuccess();
        onSuccess();
      })
      .catch((err) => {
        setFormStates({ ...formStates, isSubmitting: false });
        handleFailure(err);
      });
  };
  const handleToggleShowPassword = () => {
    setFormStates({ ...formStates, showPassword: !formStates.showPassword });
  };

  const handleToggleShowConfirmPassword = () => {
    setFormStates({
      ...formStates,
      showPasswordConfirm: !formStates.showPasswordConfirm,
    });
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      fullname: '',
      contact_number: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <CustomTextField
        fullWidth
        disabled={formStates.isSubmitting}
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
        disabled={formStates.isSubmitting}
        type={formStates.showPassword ? 'text' : 'password'}
        id='password'
        name='password'
        label='Mật khẩu'
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              tabIndex={-1} // Disable tab index
              onClick={handleToggleShowPassword}
              edge='end'
            >
              {formStates.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        value={formik.values.password}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.password)}
        helperText={formik.errors.password}
      />
      <CustomTextField
        fullWidth
        disabled={formStates.isSubmitting}
        type={formStates.showPasswordConfirm ? 'text' : 'password'}
        id='passwordConfirm'
        name='passwordConfirm'
        label='Xác nhận mật khẩu'
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              tabIndex={-1} // Disable tab index
              onClick={handleToggleShowConfirmPassword}
              edge='end'
            >
              {formStates.showPasswordConfirm ? (
                <VisibilityOff />
              ) : (
                <Visibility />
              )}
            </IconButton>
          </InputAdornment>
        }
        value={formik.values.passwordConfirm}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.passwordConfirm)}
        helperText={formik.errors.passwordConfirm}
      />
      <Typography variant='h6'>Thông tin cá nhân</Typography>
      <CustomTextField
        fullWidth
        disabled={formStates.isSubmitting}
        id='fullname'
        name='fullname'
        label='Họ và tên'
        value={formik.values.full_name}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.full_name)}
        helperText={formik.errors.full_name}
      />
      <CustomTextField
        fullWidth
        disabled={formStates.isSubmitting}
        id='contact_number'
        name='contact_number'
        label='Số điện thoại'
        value={formik.values.full_name}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.full_name)}
        helperText={formik.errors.full_name}
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
          'Đăng ký'
        )}
      </Button>
    </form>
  );
}
