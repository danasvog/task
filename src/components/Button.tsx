import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from '@emotion/native';

interface IButton {
  text: string;
  isLoading: boolean;
  onPress: () => void;
}

const StyledButton = styled.Pressable((props) => ({
  backgroundColor: props.theme.colors.lightBlue,
}));

const ButtonText = styled.Text((props) => ({
  color: props.theme.colors.white,
  fontSize: 14,
  fontWeight: '700',
}));

const Button: React.FC<IButton> = ({ text, isLoading, onPress, ...rest }) => (
  <StyledButton onPress={onPress} {...rest}>
    {isLoading && <ActivityIndicator />}
    {!isLoading && <ButtonText>{text}</ButtonText>}
  </StyledButton>
);

export default Button;
