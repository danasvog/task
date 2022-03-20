import React from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import styled from '@emotion/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IReduxState } from 'state/types';
import { TDispatch } from 'types/common';

import { fetchIssues } from '../actions';
import { getCurrentPage, isLoading } from '../selectors';

interface IMapStateToProps {
  isPreviousButtonDisabled: boolean;
  currentPage?: number;
  isDisabled: boolean;
}

interface IMapDispatchToProps {
  onPreviousPress: () => void;
  onNextPress: () => void;
}

interface IStyleProps {
  paddingBottom: number;
}

type TPagination = IMapStateToProps & IMapDispatchToProps;

const Container = styled.View<IStyleProps>(({ paddingBottom }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingBottom,
}));

const Button = styled.Pressable((props) => ({
  opacity: props.disabled ? 0.5 : 1,
}));

const ButtonText = styled.Text({
  fontSize: 12,
  fontWeight: '800',
  padding: 4,
});

const Pagination: React.FC<TPagination> = ({
  isPreviousButtonDisabled,
  currentPage,
  isDisabled,
  onNextPress,
  onPreviousPress,
}) => {
  const { bottom } = useSafeAreaInsets();
  const currentPageExists = currentPage !== undefined;

  return (
    <Container paddingBottom={bottom}>
      <Button
        disabled={isPreviousButtonDisabled || isDisabled}
        onPress={onPreviousPress}
      >
        <ButtonText>{'<= Previous'}</ButtonText>
      </Button>
      {currentPageExists && <Text>{currentPage}</Text>}
      <Button disabled={isDisabled} onPress={onNextPress}>
        <ButtonText>{'Next =>'}</ButtonText>
      </Button>
    </Container>
  );
};

const mapStateToProps = (state: IReduxState) => {
  const currentPage = getCurrentPage(state);

  return {
    isDisabled: isLoading(state),
    isPreviousButtonDisabled: !!currentPage && currentPage === 1,
    currentPage,
  };
};

const mapDispatchToProps = (dispatch: TDispatch) => ({
  onPreviousPress: () => dispatch(fetchIssues('previous')),
  onNextPress: () => dispatch(fetchIssues('next')),
});

export default connect<
  IMapStateToProps,
  IMapDispatchToProps,
  unknown,
  IReduxState
>(
  mapStateToProps,
  mapDispatchToProps
)(Pagination);
