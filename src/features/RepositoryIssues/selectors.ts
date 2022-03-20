import { IReduxState } from 'state/types';
import { NAME } from './constants';

export const getRepositoryName = (state: IReduxState) =>
  state?.[NAME]?.repositoryName;

export const getRepositoryOwner = (state: IReduxState) =>
  state?.[NAME]?.repositoryOwner;

export const getCurrentPage = (state: IReduxState) =>
  state?.[NAME]?.issues?.currentPage;

export const getIssuesUids = (state: IReduxState) =>
  state?.[NAME]?.issues?.uids || [];

export const getIssueCreatorNameByUid = (state: IReduxState, uid: string) =>
  state?.[NAME]?.issues?.byUid?.[uid]?.user?.login || '';

export const getIssueCreatorAvatarByUid = (state: IReduxState, uid: string) =>
  state?.[NAME]?.issues?.byUid?.[uid]?.user?.avatar_url || '';

export const getIssueUrlByUid = (state: IReduxState, uid: string) =>
  state?.[NAME]?.issues?.byUid?.[uid]?.html_url || '';

export const getIssueTitleByUid = (state: IReduxState, uid: string) =>
  state?.[NAME]?.issues?.byUid?.[uid]?.title || '';

export const getIssuesByUidObject = (state: IReduxState) =>
  state?.[NAME]?.issues?.byUid;

export const isLoading = (state: IReduxState) => state?.[NAME]?.isLoading;
