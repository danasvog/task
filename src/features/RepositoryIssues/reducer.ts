import { combineReducers } from 'redux';
import { handleAction } from 'redux-actions';

import { updateSimpleValue } from 'utils/reducers';
import { IRepositoryIssues } from './types';
import {
  SET_REPOSITORY_NAME,
  SET_REPOSITORY_OWNER,
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

export default combineReducers<IRepositoryIssues>({
  repositoryName: repositoryNameReducer,
  repositoryOwner: repositoryOwnerReducer,
  isLoading: isLoadingReducer,
});
