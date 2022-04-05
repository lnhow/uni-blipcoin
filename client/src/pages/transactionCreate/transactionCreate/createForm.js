import { useState } from 'react';
import { Box, Button, TextField, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectWallet } from '../../../redux/slices/wallet';

import * as yup from 'yup';
import { useFormik } from 'formik';
import TransactionAPI from '../../../helpers/api/transaction';
import { toast } from 'react-toastify';
import { formatAxiosErrorResponse } from '../../../helpers/error';

const validationSchema = yup.object({
  toAddress: yup.string('Input recipient address').required('Required'),
  amount: yup.number('Must be a valid number').required('Required'),
});

export default function TransactionCreateForm({ onSuccess = () => {} }) {
  const wallet = useSelector(selectWallet);
  const walletAddress = wallet.address;
  const [formStates, setFormStates] = useState({
    isSubmitting: false,
  });

  const handleSubmit = async (formValues) => {
    setFormStates({ ...formStates, isSubmitting: true });
    const toAddress = formValues.toAddress;
    const amount = formValues.amount;
    TransactionAPI.createTransaction(toAddress, amount)
      .then(() => {
        toast.success('Transaction created');
        onSuccess();
      })
      .catch((err) => {
        toast.error(`Failed - ${formatAxiosErrorResponse(err).message}`);
      })
      .finally(() => {
        setFormStates({ ...formStates, isSubmitting: false });
      });
  };

  const formik = useFormik({
    initialValues: {
      toAddress: '',
      amount: 0,
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box marginBottom={1}>
        <TextField
          autoFocus
          id='fromAddress'
          name='fromAddress'
          label='From address'
          margin='normal'
          fullWidth
          value={walletAddress}
          helperText='Your wallet address'
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          autoFocus
          id='toAddress'
          name='toAddress'
          label='Recipient address'
          margin='normal'
          fullWidth
          value={formik.values.toAddress}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.toAddress)}
          helperText={formik.errors.toAddress || ' '}
        />
        <TextField
          autoFocus
          id='amount'
          name='amount'
          label='Transfer amount'
          margin='normal'
          fullWidth
          type='number'
          value={formik.values.amount}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.toAddress)}
          helperText={formik.errors.toAddress || ' '}
        />
      </Box>
      <Box>
        <Button
          disabled={formStates.isSubmitting}
          variant='contained'
          fullWidth
          type='submit'
        >
          {formStates.isSubmitting ? (
            <CircularProgress color='inherit' />
          ) : (
            'Create'
          )}
        </Button>
      </Box>
    </form>
  );
}
