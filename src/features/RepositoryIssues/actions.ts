import { createAction } from 'redux-actions';
import { Alert } from 'react-native';

import { TThunk } from 'types/common';
import { API_URL } from 'utils/constants';

import { IIssueResponse, TNormalizedIssue } from './types';
import {
  getRepositoryName,
  getRepositoryOwner,
  getCurrentPage,
  getIssuesByUidObject,
} from './selectors';
import {
  SET_REPOSITORY_NAME,
  SET_REPOSITORY_OWNER,
  SET_CURRENT_PAGE,
  SET_LOADING,
  SET_ISSUES,
  RESET_ISSUES,
} from './actionTypes';

export const setRepositoryName = createAction<string>(SET_REPOSITORY_NAME);
export const setRepositoryOwner = createAction<string>(SET_REPOSITORY_OWNER);
export const setLoading = createAction<boolean>(SET_LOADING);
export const setCurrentPage = createAction<number>(SET_CURRENT_PAGE);
export const setIssues = createAction<TNormalizedIssue[]>(SET_ISSUES);
export const resetIssues = createAction(RESET_ISSUES);

export const fetchIssues = (): TThunk => (dispatch, getState) => {
  const state = getState();

  dispatch(setLoading(true));

  const repositoryOwner = getRepositoryOwner(state);
  const repositoryName = getRepositoryName(state);
  const page = getCurrentPage(state);

  fetch(
    `${API_URL}/repos/${repositoryOwner}/${repositoryName}/issues?page=${page}`
  )
    .then((response: Response) => {
      if (response.status === 404) {
        throw 'Repository not found';
      }

      return response.json();
    })
    .then((data: IIssueResponse[]) => {
      if (!data.length) {
        throw 'Issues not found';
      }

      dispatch(resetIssues());

      const normalizedData = data.map((issue) => ({
        ...issue,
        uid: `${issue.id}`,
      }));

      dispatch(setIssues(normalizedData));
    })
    .catch((error) => Alert.alert(error))
    .finally(() => {
      dispatch(setLoading(false));
    });
};

export const handleSortByTitleClick = (): TThunk => (_dispatch, getState) => {
  const state = getState();
  const issuesObject = getIssuesByUidObject(state);

  if (!issuesObject) {
    return;
  }

  const issues = Object.values(issuesObject);

  console.log({ issues });
};
