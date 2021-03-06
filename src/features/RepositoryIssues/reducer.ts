import { combineReducers } from 'redux';
import { handleAction } from 'redux-actions';

import { IByUid } from 'types/common';
import resetReducer from 'utils/resetReducer';
import { updateSimpleValue, addUids, addByUid } from 'utils/createReducers';

import { IRepositoryIssues, IIssuesReducers, TNormalizedIssue } from './types';
import {
  SET_REPOSITORY_NAME,
  SET_REPOSITORY_OWNER,
  SET_CURRENT_PAGE,
  SET_ISSUES,
  RESET_ISSUES_STATE,
  RESET_ISSUES_DATA,
  SET_LOADING,
} from './actionTypes';

const repositoryOwnerReducer = handleAction<string, string>(
  SET_REPOSITORY_OWNER,
  updateSimpleValue,
  ''
);

const repositoryNameReducer = handleAction<string, string>(
  SET_REPOSITORY_NAME,
  updateSimpleValue,
  ''
);

const isLoadingReducer = handleAction<boolean, boolean>(
  SET_LOADING,
  updateSimpleValue,
  false
);

const currentPageReducer = handleAction<number, number>(
  SET_CURRENT_PAGE,
  updateSimpleValue,
  0
);

const issuesUidsReducer = handleAction<string[], TNormalizedIssue[]>(
  SET_ISSUES,
  addUids,
  []
);

const issuesByUidReducer = handleAction<
  IByUid<TNormalizedIssue>,
  TNormalizedIssue[]
>(SET_ISSUES, addByUid, {});

const issuesReducers = combineReducers<IIssuesReducers>({
  uids: resetReducer([RESET_ISSUES_DATA], issuesUidsReducer),
  byUid: resetReducer([RESET_ISSUES_DATA], issuesByUidReducer),
  currentPage: currentPageReducer,
});

export default combineReducers<IRepositoryIssues>({
  repositoryName: repositoryNameReducer,
  repositoryOwner: repositoryOwnerReducer,
  isLoading: isLoadingReducer,
  issues: resetReducer([RESET_ISSUES_STATE], issuesReducers),
});
