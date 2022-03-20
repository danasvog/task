import React from 'react';
import { Linking } from 'react-native';
import { connect } from 'react-redux';
import styled from '@emotion/native';
import FastImage from 'react-native-fast-image';

import { IReduxState } from 'state/types';

import {
  getIssueCreatorAvatarByUid,
  getIssueCreatorNameByUid,
  getIssueTitleByUid,
  getIssueUrlByUid,
} from '../selectors';

interface IMapStateToProps {
  creator: string;
  title: string;
  avatar: string;
  url: string;
}

interface IOwnProps {
  uid: string;
}

type TIssueCard = IMapStateToProps & IOwnProps;

const Container = styled.Pressable((props) => ({
  borderColor: props.theme.colors.black,
  borderWidth: 1,
  borderRadius: 20,
  flexDirection: 'row',
  paddingVertical: 8,
  paddingHorizontal: 12,
  marginBottom: 12,
  alignItems: 'center',
}));

const CreatorContainer = styled.View({
  alignItems: 'center',
  flex: 1,
  paddingRight: 8,
});

const CreatorText = styled.Text({
  textAlign: 'center',
});

const IssueTitle = styled.Text({
  flex: 2,
});

const IssueCard: React.FC<TIssueCard> = ({ url, avatar, title, creator }) => {
  const onPress = () => {
    Linking.openURL(url);
  };

  return (
    <Container onPress={onPress}>
      <CreatorContainer>
        <FastImage
          style={{ width: 30, height: 30, borderRadius: 15 }}
          source={{ uri: avatar }}
        />
        <CreatorText>{creator}</CreatorText>
      </CreatorContainer>
      <IssueTitle numberOfLines={3}>{title}</IssueTitle>
    </Container>
  );
};

const mapStateToProps = (state: IReduxState, { uid }: IOwnProps) => ({
  avatar: getIssueCreatorAvatarByUid(state, uid),
  creator: getIssueCreatorNameByUid(state, uid),
  title: getIssueTitleByUid(state, uid),
  url: getIssueUrlByUid(state, uid),
});

export default connect<IMapStateToProps, unknown, IOwnProps, IReduxState>(
  mapStateToProps
)(IssueCard);
