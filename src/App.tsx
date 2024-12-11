import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { AppRoutes } from './routes';
import { Toaster } from './components/ui/Toaster';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;