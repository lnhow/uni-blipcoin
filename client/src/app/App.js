import Layout from "../layout";
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import store from '../redux/store';

function App() {
  return (
    <Provider store={store}>
      <Layout/>
      <ToastContainer
          theme='light'
          position='top-center'
          autoClose={3000}
          pauseOnHover={false}
          closeOnClick
          pauseOnFocusLoss={false}
          hideProgressBar
        />
    </Provider>
  );
}

export default App;
