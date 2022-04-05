import { Route, Switch } from 'react-router-dom';
// import AuthOnlyRoute from './customRoute/authOnlyRoute';
// import NonAuthOnlyRoute from './customRoute/nonAuthOnlyRoute';

// Pages
import NotFoundPage from '../pages/notfound';
import HomePage from '../pages/home';
import BlockInfoPage from '../pages/block';
import WalletInfoPage from '../pages/wallet';
import WalletAccessPage from '../pages/walletAccess';
import WalletCreatePage from '../pages/walletCreate';
import TransactionCreatePage from '../pages/transactionCreate';
// Pages

function Router() {
  return (
    <Switch>
      <Route exact path='/'>
        <HomePage />
      </Route>
      <Route exact path='/create-wallet'>
        <WalletCreatePage />
      </Route>
      <Route exact path='/access-wallet'>
        <WalletAccessPage />
      </Route>
      <Route exact path='/create-transaction'>
        <TransactionCreatePage />
      </Route>
      <Route path='/block/:blockIndex'>
        <BlockInfoPage />
      </Route>
      <Route path='/wallet/:walletAddress'>
        <WalletInfoPage />
      </Route>
      <Route exact path='/notfound'>
        <NotFoundPage />
      </Route>
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  );
}

export default Router;
