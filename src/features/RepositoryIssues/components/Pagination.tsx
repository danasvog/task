import React from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/native';

import { IReduxState } from 'state/types';

import { fetchIssues } from '../actions';
import { getCurrentPage } from '../selectors';
import { TDispatch } from 'types/common';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface IMapStateToProps {
  isPreviousButtonDisabled: boolean;
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
  onNextPress,
  onPreviousPress,
}) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <Container paddingBottom={bottom}>
      <Button disabled={isPreviousButtonDisabled} onPress={onPreviousPress}>
        <ButtonText>{'<= Previous'}</ButtonText>
      </Button>
      <Button onPress={onNextPress}>
        <ButtonText>{'Next =>'}</ButtonText>
      </Button>
    </Container>
  );
};

const mapStateToProps = (state: IReduxState) => {
  const currentPage = getCurrentPage(state);

  return {
    isPreviousButtonDisabled: !!currentPage && currentPage === 1,
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
