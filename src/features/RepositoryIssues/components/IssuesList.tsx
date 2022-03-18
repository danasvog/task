import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';

import { IReduxState } from 'state/types';
import hideable, { TWithHideableProp } from 'utils/hideable';

import IssueCard from './IssueCard';
// import IssuesListHeader from './IssuesListHeader';
import { getIssuesUids } from '../selectors';

interface IMapStateToProps {
  uids: string[];
}

type TIssuesList = IMapStateToProps;

const MemoizedComponent = React.memo(
  IssueCard,
  (prevComponent, nextComponent) => prevComponent.uid === nextComponent.uid
);

const IssuesList: React.FC<TIssuesList> = ({ uids }) => (
  <FlatList<string>
    keyExtractor={(item: string) => item}
    data={uids}
    // ListHeaderComponent={IssuesListHeader}
    contentContainerStyle={{ paddingBottom: 20 }}
    renderItem={({ item }) => <MemoizedComponent key={item} uid={item} />}
  />
);

const mapStateToProps = (state: IReduxState) => {
  const uids = getIssuesUids(state);

  return {
    isVisible: !!uids.length,
    uids,
  };
};

export default connect<
  TWithHideableProp<IMapStateToProps>,
  unknown,
  unknown,
  IReduxState
>(mapStateToProps)(hideable(IssuesList));
