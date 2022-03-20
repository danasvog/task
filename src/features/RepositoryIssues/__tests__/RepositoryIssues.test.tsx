import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';

import createStore from 'state/store';
import { theme } from 'theme';

import RepositoryIssues from '../components/RepositoryIssues';
import { API_URL } from 'utils/constants';

let store: any;
describe('Repository issues', () => {
  beforeEach(() => {
    store = createStore();
  });

  test('should fetch issues when form is filled and submit button is pressed', async () => {
    const promise = Promise.resolve([]);

    const { getAllByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <RepositoryIssues />
        </ThemeProvider>
      </Provider>
    );

    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => promise,
      })
    );

    const ownerInput = getAllByPlaceholderText('Repository owner');
    const nameInput = getAllByPlaceholderText('Repository name');
    const submitButton = getByText('Submit');

    fireEvent.changeText(ownerInput[0], 'jquery');
    fireEvent.changeText(nameInput[0], 'jquery');
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${API_URL}/repos/jquery/jquery/issues?page=1`
      );
    });
  });
});
