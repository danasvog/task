import styled from '@emotion/native';

export default styled.TextInput((props) => ({
  borderColor: props.theme.colors.black,
  borderWidth: 1,
  borderRadius: 20,
  width: '100%',
  paddingHorizontal: 10,
  paddingVertical: 8,
  marginVertical: 6,
}));
