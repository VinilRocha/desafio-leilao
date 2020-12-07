import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

import AppProvider from './hooks/index';

import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <>
    <AppProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AppProvider>

    <GlobalStyle />
  </>
);

export default App;
