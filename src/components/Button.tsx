import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from '@emotion/native';

interface IButton {
  text: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  onPress: () => void;
}

const StyledButton = styled.Pressable((props) => ({
  backgroundColor: props.theme.colors.lightBlue,
  paddingVertical: 12,
  borderRadius: 20,
}));

const ButtonText = styled.Text((props) => ({
  color: props.theme.colors.white,
  fontSize: 14,
  fontWeight: '700',
  textAlign: 'center',
}));

const Button: React.FC<IButton> = ({
  text,
  isDisabled = false,
  isLoading = false,
  onPress,
  ...rest
}) => (
  <StyledButton disabled={isDisabled || isLoading} onPress={onPress} {...rest}>
    {isLoading && <ActivityIndicator color="white" />}
    {!isLoading && <ButtonText>{text}</ButtonText>}
  </StyledButton>
);

export default Button;
