import { Route, Switch } from 'react-router-dom';
// import AuthOnlyRoute from './customRoute/authOnlyRoute';
// import NonAuthOnlyRoute from './customRoute/nonAuthOnlyRoute';

// Pages
import NotFoundPage from '../pages/notfound';
import HomePage from '../pages/home';
import BlockInfoPage from '../pages/block';

// Pages

function Router() {
  return (
    <Switch>
      <Route exact path='/'>
        <HomePage />
      </Route>
      <Route path='/block/:blockIndex'>
        <BlockInfoPage />
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
