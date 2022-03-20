import React from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IReduxState } from 'state/types';

import { handleSortByTitleClick, resetIssues } from '../actions';

interface IMapDispatchToProps {
  onClosePress: () => void;
  onSortPress: () => void;
}

interface IStyleProps {
  paddingTop: number;
}

type TIssuesListHeader = IMapDispatchToProps;

const Container = styled.View<IStyleProps>(({ paddingTop }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingTop,
  paddingBottom: 20,
}));

const Button = styled.Pressable((props) => ({
  borderColor: props.theme.colors.black,
  borderWidth: 1,
  borderRadius: 12,
  paddingVertical: 4,
  paddingHorizontal: 8,
}));

const SortText = styled.Text({});

const CloseText = styled.Text({});

const IssuesListHeader: React.FC<TIssuesListHeader> = ({
  onClosePress,
  onSortPress,
}) => {
  const { top } = useSafeAreaInsets();

  return (
    <Container paddingTop={top + 20}>
      <Button onPress={onSortPress}>
        <SortText>Sort</SortText>
      </Button>
      <Button onPress={onClosePress}>
        <CloseText>Close</CloseText>
      </Button>
    </Container>
  );
};

const mapDispatchToProps = {
  onSortPress: handleSortByTitleClick,
  onClosePress: resetIssues,
};

export default connect<unknown, IMapDispatchToProps, unknown, IReduxState>(
  null,
  mapDispatchToProps
)(IssuesListHeader);
