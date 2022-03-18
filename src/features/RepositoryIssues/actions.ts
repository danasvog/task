import { createAction } from 'redux-actions';
import { TThunk } from 'types/common';

import { getRepositoryName, getRepositoryOwner } from './selectors';
import {
  SET_REPOSITORY_NAME,
  SET_REPOSITORY_OWNER,
  SET_LOADING,
} from './actionTypes';

export const setRepositoryName = createAction<string>(SET_REPOSITORY_NAME);
export const setRepositoryOwner = createAction<string>(SET_REPOSITORY_OWNER);
export const setLoading = createAction<boolean>(SET_LOADING);

export const fetchIssues = (): TThunk => (dispatch, getState) => {
  const state = getState();

  dispatch(setLoading(true));

  const repositoryOwner = getRepositoryOwner(state);
  const repositoryName = getRepositoryName(state);

  console.log({ repositoryName, repositoryOwner });

  dispatch(setLoading(false));
};
