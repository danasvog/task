import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@emotion/react';

import RepositoryIssues from 'features/RepositoryIssues/components';
import store from 'state/store';
import { theme } from 'theme';

const App: React.FC = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <RepositoryIssues />
    </ThemeProvider>
  </Provider>
);

export default App;
