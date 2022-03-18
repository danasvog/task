import { combineReducers } from 'redux';

import { IReduxState } from './types';
import repositoryIssues from 'features/RepositoryIssues';

const reducers = combineReducers<IReduxState>({
  [repositoryIssues.constants.NAME]: repositoryIssues.reducer,
});

export default reducers;
