import React, { useContext, useState } from 'react';
import { Text } from 'react-native';
import {
  Container,
  Title,
  Input,
  Button,
  ButtonText,
  SignUpButton,
  SignUpText,
} from './styles';
import * as Animatable from 'react-native-animatable';
import { GooglePlacesAutocomplete }
  from 'react-native-google-places-autocomplete';
import { autocomplete } from '../ApiKey/keys.js';
import { Context as AuthContext } from '../../contexts/AuthContext';

const TitleAnimated = Animatable.createAnimatableComponent(Title);

export default function Login() {
  const { state, signup, signin, signout } = useContext(AuthContext);

  const [login, setLogin] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [selectCity, setSelectCity] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');

  function toggleLogin() {
    setLogin(!login);
    setName('');
    setAge('');
    setCity('');
    setEmail('');
    setPassword('');
    setConfPassword('');
  }

  function handleLogin() {
    if (
          email === '' ||
          email === null ||
          password === '' ||
          password === null
        ) {
      alert('Preencha os campos!');
      return;
    }    
  signin({
    email,
    password
  });
}

  function handleSignUp() {
    const validateEmail =
    /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+).(\.[a-z]{2,3})$/;

    if (selectCity === null) {
      alert('Selecione uma cidade');
      return;
    }

    else if (
        name === null ||
        name === '' ||
        age === null ||
        age === '' ||
        email === null ||
        email === '' ||
        password === null ||
        password === '' ||
        confPassword === null ||
        confPassword === ''
        ) {
      alert('Preencha Todos os Campos');
        return;
      }
      
    else if (age < 18 ) {
      alert('Voc?? precisa ser maior de idade para ser Begrato');
      return;
    }

    else if (!validateEmail.test(email)) {
      alert('O e-mail digitado ?? inv??lido');
      return;
    }
    
    else if (password !== confPassword) {
      alert('As senhas n??o conferem');
      return;
    }
    signup({
      email,
      password,
      confPassword,
      name,
      age,
      city: selectCity,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude
    });
  }

  if (login) {
    return (
      <Container><TitleAnimated animation="fadeInDown">
      Be
      <Text style={{ fontStyle: 'italic', color: '#ff8040' }}>
        Gra
        <Text style={{ fontStyle: 'italic', color: '#cf3030' }}>
          To</Text></Text></TitleAnimated>

    <Input
      placeholder="e-mail@e-mail.com"
      placeholderTextColor="#666"
      value={email}
      onChangeText={(text) => setEmail(text)}
    />
    <Input
      placeholder="******"
      placeholderTextColor="#666"
      secureTextEntry={true}
      value={password}
      onChangeText={(text) => setPassword(text)}
    />
  
    <Button onPress={handleLogin}>
      {/* { */}
        {/* loadingAuth ? (
          <ActivityIndicator size={20} color="#cf3030" />
        ) : ( */}
          <ButtonText>Acessar</ButtonText>
        {/* ) */}
      {/* } */}
    </Button>

    <SignUpButton onPress={() => toggleLogin()}>
      <SignUpText>Criar uma conta</SignUpText>
    </SignUpButton>
      </Container>
    );
  }
  return (
    <Container>
    <TitleAnimated animation="fadeInUp">
      Be
      <Text style={{ fontStyle: 'italic', color: '#ff8040' }}>
        Gra
        <Text style={{ fontStyle: 'italic', color: '#cf3030' }}>
          To</Text></Text></TitleAnimated>

    <Input
      placeholder="Nome"
      placeholderTextColor="#666"
      value={name}
      onChangeText={(text) => setName(text)}
    />

    <Input
      placeholder="Idade"
      placeholderTextColor="#666"
      keyboardType="number-pad"
      value={age}
      onChangeText={(text) => setAge(text)}
    />

    <GooglePlacesAutocomplete
      placeholder="Cidade"
      textInputProps={{ placeholderTextColor: '#666' }}
      onPress={(data, details) => {
        setCoordinates({
          latitude:details.geometry.location.lat.toString(),
          longitude:details.geometry.location.lng.toString(),
        });
        setSelectCity(data.terms[0].value);
      }}
      query={{
        key: autocomplete,
        language: 'pt-BR',
      }}
      enablePoweredByContainer={false}
      autoFillOnNotFound={true}
      autoFocus={true}
      fetchDetails={true}
      styles={{
        container:{
          flex:0,
          marginTop:10,
          maxHeight:300,
          minHeight:0,
        },
        textInputContainer: {
          width: '80%',
          backgroundColor: '#fff',
          borderRadius:7,
        },
        borderRadius: 7,
        textInput: {
          fontSize: 17,
          color: '#666',
          backgroundColor:'transparent',
          fontSize: 16,
        },
        listView:{
          width:'80%',
        },
      }}
    />

    <Input
      placeholder="email@email.com"
      placeholderTextColor="#666"
      value={email}
      onChangeText={(text) => setEmail(text)}
    />

    <Input
      placeholder="******"
      placeholderTextColor="#666"
      secureTextEntry={true}
      value={password}
      onChangeText={(text) => setPassword(text)}
    />

    <Input
      placeholder="******"
      placeholderTextColor="#666"
      secureTextEntry={true}
      value={confPassword}
      onChangeText={(text) => setConfPassword(text)}
    />

  <Button onPress={handleSignUp}>
    {/* {
      loadingAuth ? (
        <ActivityIndicator size={20} color="#cf3030" />
      ) : ( */}
        {/* <ButtonText onPress={() => signup({
          name, age, city, email, password
        })}>Cadastrar</ButtonText> */}

        <ButtonText>Cadastrar</ButtonText>
      {/* )
    } */}
  </Button>

  <SignUpButton onPress={() => toggleLogin()}>
    <SignUpText>J?? sou BeGraTo</SignUpText>
  </SignUpButton>
  </Container>
  );
}
