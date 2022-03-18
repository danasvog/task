import React from 'react';
import { connect } from 'react-redux';
import { Pressable } from 'react-native';
import styled from '@emotion/native';

import { IReduxState } from 'state/types';

import { handleSortByTitleClick, resetIssues } from '../actions';

interface IMapDispatchToProps {
  onClosePress: () => void;
  onSortPress: () => void;
}

type TIssuesListHeader = IMapDispatchToProps;

const Container = styled.SafeAreaView({
  paddingTop: 20,
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const SortText = styled.Text({});

const CloseText = styled.Text({});

const IssuesListHeader: React.FC<TIssuesListHeader> = ({
  onClosePress,
  onSortPress,
}) => (
  <Container>
    <Pressable onPress={onSortPress}>
      <SortText>Sort</SortText>
    </Pressable>
    <Pressable onPress={onClosePress}>
      <CloseText>Close</CloseText>
    </Pressable>
  </Container>
);

const mapDispatchToProps = {
  onSortPress: handleSortByTitleClick,
  onClosePress: resetIssues,
};

export default connect<unknown, IMapDispatchToProps, unknown, IReduxState>(
  null,
  mapDispatchToProps
)(IssuesListHeader);
