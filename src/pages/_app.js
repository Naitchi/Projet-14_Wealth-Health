import '@/styles/globals.css';
import 'react-datepicker/dist/react-datepicker.css'; // Styles for the datepicker

import store from '../redux/store';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
