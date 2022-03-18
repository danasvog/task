import { IReduxState } from 'state/types';
import { NAME } from './constants';

export const getRepositoryName = (state: IReduxState) =>
  state?.[NAME]?.repositoryName;

export const getRepositoryOwner = (state: IReduxState) =>
  state?.[NAME]?.repositoryOwner;

export const isLoading = (state: IReduxState) => state?.[NAME]?.isLoading;
