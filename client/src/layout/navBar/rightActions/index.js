import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectWallet } from '../../../redux/slices/wallet';
import DefaultActions from './defaultActions';
import LoggedInActions from './loggedInActions';

export default function RightActions() {
  const wallet = useSelector(selectWallet);

  if (wallet.isLogin) {
    return <LoggedInActions />;
  }

  return <DefaultActions />;
}
