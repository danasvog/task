import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native';
import styled from '@emotion/native';

import Input from 'components/Input';
import Button from 'components/Button';
import { IReduxState } from 'state/types';
import hideable, { TWithHideableProp } from 'utils/hideable';

import { setRepositoryName, setRepositoryOwner, fetchIssues } from '../actions';
import {
  getRepositoryName,
  getRepositoryOwner,
  isLoading,
  getIssuesUids,
} from '../selectors';

interface IMapStateToProps {
  repositoryOwner: string;
  repositoryName: string;
  repositoryOwnerPlaceholder: string;
  repositoryNamePlaceholder: string;
  buttonText: string;
  isButtonLoaderVisible: boolean;
}

interface IMapDispatchToProps {
  onOwnerInputChange: (value: string) => void;
  onNameInputChange: (value: string) => void;
  onButtonPress: () => void;
}

type TFindRepository = IMapStateToProps & IMapDispatchToProps;

const Container = styled.View({
  paddingVertical: 20,
  paddingHorizontal: 12,
});

const FindRepository: React.FC<TFindRepository> = ({
  repositoryName,
  repositoryOwner,
  repositoryNamePlaceholder,
  repositoryOwnerPlaceholder,
  buttonText,
  isButtonLoaderVisible,
  onNameInputChange,
  onOwnerInputChange,
  onButtonPress,
}) => (
  <SafeAreaView>
    <Container>
      <Input
        placeholder={repositoryOwnerPlaceholder}
        value={repositoryOwner}
        onChangeText={onOwnerInputChange}
        autoCapitalize="none"
      />
      <Input
        placeholder={repositoryNamePlaceholder}
        value={repositoryName}
        onChangeText={onNameInputChange}
        autoCapitalize="none"
      />
      <Button
        text={buttonText}
        isLoading={isButtonLoaderVisible}
        onPress={onButtonPress}
      />
    </Container>
  </SafeAreaView>
);

const mapStateToProps = (state: IReduxState) => ({
  repositoryOwner: getRepositoryOwner(state),
  repositoryName: getRepositoryName(state),
  isButtonLoaderVisible: isLoading(state),
  repositoryOwnerPlaceholder: 'Repository owner',
  repositoryNamePlaceholder: 'Repository name',
  buttonText: 'Submit',
  isVisible: !getIssuesUids(state)?.length,
});

const mapDispatchToProps = {
  onOwnerInputChange: setRepositoryOwner,
  onNameInputChange: setRepositoryName,
  onButtonPress: fetchIssues,
};

export default connect<
  TWithHideableProp<IMapStateToProps>,
  IMapDispatchToProps,
  unknown,
  IReduxState
>(
  mapStateToProps,
  mapDispatchToProps
)(hideable(FindRepository));
