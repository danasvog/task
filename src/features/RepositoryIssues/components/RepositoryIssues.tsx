import React from 'react';

import FindRepository from './FindRepository';
import IssuesList from './IssuesList';

const RepositoryIssues: React.FC = () => (
  <>
    <FindRepository />
    <IssuesList />
  </>
);

export default RepositoryIssues;
