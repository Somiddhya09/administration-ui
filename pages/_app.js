// pages/_app.js
import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import { ReportsProvider } from '../context/ReportsContext';

export default function App({ Component, pageProps }) {
  return (
    <ReportsProvider>
      <Component {...pageProps} />
      <Toaster position="top-right" />
    </ReportsProvider>
  );
}