import { IByUid } from 'types/common';
import { IUidsPayload } from 'utils/createReducers';

export interface IRepositoryIssues {
  repositoryOwner: string;
  repositoryName: string;
  isLoading: boolean;
  issues?: IIssuesReducers;
}

export interface IIssuesReducers {
  uids: string[];
  byUid: IByUid<TNormalizedIssue>;
  currentPage: number;
}

export interface IIssueResponse {
  title: string;
  html_url: string;
  id: number;
  user: {
    login: string;
    avatar_url: string;
  };
}

export type TNormalizedIssue = IIssueResponse & IUidsPayload;

export type TPagination = 'next' | 'previous';
