import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #2a2d2e;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 55px;
  font-weight: bold;
  font-style: italic;
`;

export const Input = styled.TextInput`
  width: 80%;
  background-color: #fff;
  padding: 10px;
  margin-top: 10px;
  border-radius: 7px;
  font-size: 17px;
`;

export const Button = styled.TouchableOpacity`
  width: 80%;
  background-color: #00ffff;
  padding: 10px;
  margin-top: 10px;
  border-radius: 7px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-size: 20px;
  color: #0000ff;
`;

export const SignUpButton = styled.TouchableOpacity`
  width: 100%;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
`;

export const SignUpText = styled.Text`
  color: #ffff00;
  font-size: 15px;
`;
