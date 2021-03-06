import { createAction } from 'redux-actions';
import { Alert } from 'react-native';

import { TThunk } from 'types/common';
import { API_URL } from 'utils/constants';

import { IIssueResponse, TNormalizedIssue, TPagination } from './types';
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
  RESET_ISSUES_STATE,
  RESET_ISSUES_DATA,
} from './actionTypes';

export const setRepositoryName = createAction<string>(SET_REPOSITORY_NAME);
export const setRepositoryOwner = createAction<string>(SET_REPOSITORY_OWNER);
export const setLoading = createAction<boolean>(SET_LOADING);
export const setCurrentPage = createAction<number>(SET_CURRENT_PAGE);
export const setIssues = createAction<TNormalizedIssue[]>(SET_ISSUES);
export const resetIssuesState = createAction(RESET_ISSUES_STATE);
export const resetIssuesData = createAction(RESET_ISSUES_DATA);

export const fetchIssues =
  (pagination: TPagination): TThunk =>
  (dispatch, getState) => {
    const state = getState();

    dispatch(setLoading(true));

    const repositoryOwner = getRepositoryOwner(state);
    const repositoryName = getRepositoryName(state);
    const currentPage = getCurrentPage(state);

    if (!repositoryOwner || !repositoryName) {
      Alert.alert('Please provide repository details.');

      return;
    }

    if (currentPage === undefined) {
      Alert.alert('Something went wrong.');

      return;
    }

    const nextPage = pagination === 'next' ? currentPage + 1 : currentPage - 1;

    fetch(
      `${API_URL}/repos/${repositoryOwner}/${repositoryName}/issues?page=${nextPage}`
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

        dispatch(resetIssuesData());

        const normalizedData = data.map((issue) => ({
          ...issue,
          uid: `${issue.id}`,
        }));

        dispatch(setIssues(normalizedData));
        dispatch(setCurrentPage(nextPage));
      })
      .catch((error) => Alert.alert(error))
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

export const handleSortByTitleClick = (): TThunk => (dispatch, getState) => {
  const state = getState();
  const issuesObject = getIssuesByUidObject(state);

  if (!issuesObject) {
    return;
  }

  const issues = Object.values(issuesObject);
  const sortedIssues = issues.sort((object1, object2) =>
    object1.title.localeCompare(object2.title)
  );

  dispatch(resetIssuesData());
  dispatch(setIssues(sortedIssues));
};
