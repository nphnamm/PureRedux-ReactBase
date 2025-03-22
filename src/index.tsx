import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import store, { RootState } from './store';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LoadingSpinner from './components/LoadingSpinner';
interface CustomProps {
  children: React.ReactNode;
}
const Custom: React.FC<CustomProps> = ({ children }) => {
  const { isLoading } = useSelector((state: RootState) => ({
    isLoading: (state as RootState).auth.isLoading
  }));
  return <>{isLoading ? <LoadingSpinner/> : <>{children}</>}</>;
};
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Custom>
        <App />
      </Custom>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
