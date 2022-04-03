import { BrowserRouter } from 'react-router-dom';

import NavBar from './navBar';
import Router from '../route';

function Layout() {
  return (
    <BrowserRouter>
      <NavBar />
      <div style={{ minHeight: '80vh' }}>
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default Layout;
