import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RepositoryIssues from 'features/RepositoryIssues/components';
import store from 'state/store';
import { theme } from 'theme';

const App: React.FC = () => (
  <SafeAreaProvider>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RepositoryIssues />
      </ThemeProvider>
    </Provider>
  </SafeAreaProvider>
);

export default App;
