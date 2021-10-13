/* eslint-disable prettier/prettier */
import React, { useState, useContext } from 'react';
import { Text, ActivityIndicator  } from 'react-native';
import apiKey from '../../../apiKey/apiKey';

// reusable context
import { AuthContext } from '../../contexts/auth';

import {
  Container,
  Title,
  Input,
  Button,
  ButtonText,
  SignUpButton,
  SignUpText } from './styles';

import * as Animatable from 'react-native-animatable';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const TitleAnimated = Animatable.createAnimatableComponent(Title);

export default function Login({navigation}) {
  const { signUp, signIn, loadingAuth } = useContext(AuthContext);
  const [login, setLogin] = useState(true);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [selectCity, setSelectCity] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [hasPermission, setHasPermision] = useState(false);

  function toggleLogin() {
    setLogin(!login);
    setName('');
    setAge('');
    setEmail('');
    setPassword('');
    setConfPassword('');
  }

  function handleSignIn() {
    if (email === '' || password === '') {
      alert('Preencha Todos os Campos');
      return;
    }
    signIn(email, password);
  }

  function handleSignUp() {
    if (name === '' || age === '' || email === '' || password === '' || confPassword === '') {
      alert('Preencha Todos os Campos');
      if (password !== confPassword) {
        alert('As senhas não conferem');
        return;
      }
    }
    signUp(email, password, confPassword, name, age, selectCity.city);
  }

  function handleSignUp() {
    if (selectCity === null) {
      alert('Selecione uma cidade');
      return;
    }

    if (name === '' || age === '' || email === '' || password === '' ||
      confPassword === '') {
      alert('Preencha Todos os Campos');
      if (password !== confPassword) {
        alert('As senhas não conferem');
        return;
      }
    }
    signUp(email, password, confPassword, name, age, selectCity, coordinates.latitude,
      coordinates.longitude);
  }

  if (login) {
    return (
      <Container>
        <TitleAnimated animation="fadeInDown">
          Be
          <Text style={{ fontStyle: 'italic', color: '#ff8040' }}>
            Gra
            <Text style={{ fontStyle: 'italic', color: '#cf3030' }}>
              To</Text></Text></TitleAnimated>

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

        <Button onPress={handleSignIn}>
          {
            loadingAuth ? (
              <ActivityIndicator size={20} color="#cf3030" />
            ) : (
              <ButtonText>Acessar</ButtonText>
            )
          }
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
          key: apiKey,
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
            color: '#fff',
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
        {
          loadingAuth ? (
            <ActivityIndicator size={20} color="#cf3030" />
          ) : (
            <ButtonText>Cadastrar</ButtonText>
          )
        }
      </Button>

      <SignUpButton onPress={() => toggleLogin()}>
        <SignUpText>Já sou BeGraTo</SignUpText>
      </SignUpButton>
    </Container>
  );
}
