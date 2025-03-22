import React from 'react';
import './App.css';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';


const App: React.FC = () => {
  return (
    <main>
      <ThemeProvider>
        <Toaster position="top-right" reverseOrder={false} />
        <RouterProvider router={router} />
      </ThemeProvider>
    </main>
  );
}

export default App;
