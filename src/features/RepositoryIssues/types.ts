import { IByUid } from 'types/common';
import { IUidsPayload } from 'utils/createReducers';

export interface IRepositoryIssues {
  repositoryOwner: string;
  repositoryName: string;
  currentPage: number;
  isLoading: boolean;
  issues?: IIssuesReducers;
}

export interface IIssuesReducers {
  uids: string[];
  byUid: IByUid<TNormalizedIssue>;
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
