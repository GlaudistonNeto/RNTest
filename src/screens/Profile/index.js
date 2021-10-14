/* eslint-disable prettier/prettier */
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/auth';
import apiKey from '../../../apiKey/apiKey';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';

import { Modal, Platform, ActivityIndicator } from 'react-native';
import {
  Container,
  UploadButton,
  UploadText,
  ProfilePhoto,
  Name,
  Email,
  City,
  Button,
  ButtonText,
  ModalContainer,
  ButtonBack,
  Input,
}  from './styles';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Header from '../../components/Header';
import Feather from 'react-native-vector-icons/Feather';

export default function Profile() {
  const { user, signOut, storageUser, setUser} = useContext(AuthContext);

  const [name, setName] = useState(user?.name);
  const [selectCity, setSelectCity] = useState(null);
  const [email, setEmail] = useState(user?.email);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        let respose = await storage().ref('profilePhotos').child(user?.uid).getDownloadURL();

          setProfilePhotoUrl(respose);
      } catch (err) {}
    }

    load();
  }, []);

  // update profile
  async function updateProfile() {
    if (name === '' || selectCity === null || email === '') {
      return;
    }

    await firestore().collection('users')
    .doc(user.uid).update({
      name: name,
      city: selectCity,
    });

    // look for all user posts
    const postDocs = await firestore().collection('posts')
      .where('userId', '==', user.uid).get();

      // updating author from these posts
      postDocs.forEach(async doc => {
        await firestore().collection('posts').doc(doc.id).update({
          author: name,
        });
      });

      let data = {
        uid: user.uid,
        name: name,
        city: selectCity,
        email: user.email,
      };

      setUser(data);
      storageUser(data);
      setOpen(false);
  }

  const uploadFile = () => {
    const options = {
      noData: true,
      mediaType: 'photo',
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
      } else if (response.error) {} else {
        uploadFileFirebase(response)
        .then(() => {
          uploadProfPhotsPosts();
        });
        setProfilePhotoUrl(response.uri);
      }
    });
  };

  const getFileLocalPath = response => {
    const {path, uri} = response;
    return Platform.OS === 'android' ? uri : path;
  };

  const uploadFileFirebase = async response => {
    const fileSource = getFileLocalPath(response);
    const storageRef = storage().ref('profilePhotos').child(user?.uid);
    return await storageRef.putFile(fileSource);
  };

  async function uploadProfPhotsPosts() {
    const storageRef = storage().ref('profilePhotos').child(user?.uid);
    const profilePhotoUrl = await storageRef.getDownloadURL()
      .then(async img => {
        // update posts userPhoto
        const postDocs = await firestore().collection('posts')
          .where('userId', '==', user.uid).get();

          postDocs.forEach(async doc => {
            await firestore().collection('posts').doc(doc.id).update({
              profilePhotoUrl: img,
            });
          });
      })
      .catch((error) => {});
  }

  return (
    <Container>
      <Header />

      {
        profilePhotoUrl ?
        (
          <UploadButton>
            <UploadText onPress={uploadFile}>+</UploadText>
            <ProfilePhoto
              source={{ uri: profilePhotoUrl }}
            />
          </UploadButton>
        ) :
        (
          <UploadButton>
            <UploadText onPress={uploadFile}>+</UploadText>
          </UploadButton>
        )
      }

      <Name numberOfLines={1}>{user?.name}</Name>
      <City numberOfLines={1}>{user?.city}</City>
      <Email numberOfLines={1}>{user?.email}</Email>

      <Button bg="#528cfd" onPress={() => setOpen(true)}>
        <ButtonText color="#fff">Atualizar Perfil</ButtonText>
      </Button>

      <Button bg="#fff" onPress={() => signOut()}>
        <ButtonText color="#515151">Sair</ButtonText>
      </Button>

      <Modal visible={open} animationType="slide" transparent={true}>
      <ModalContainer behavior={Platform.OS === 'android' ? '' : 'padding'}>
        <ButtonBack>
          <Feather
            name="arrow-left"
            size={22}
            color="#121212"
          />
        <ButtonText color="#121212" onPress={() => setOpen(false)}>Voltar</ButtonText>
        </ButtonBack>

        <Input
          placeholder={user?.name}
          value={name}
          onChangeText={(text) => setName(text)}
        />

      <GooglePlacesAutocomplete
        placeholder="Cidade"
        onPress={(data, details) => {
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
            marginTop: 10,
            marginBottom: 10,
            maxHeight: 300,
            minHeight: 0,
          },
          textInputContainer: {
            width: '90%',
            height: 50,
            backgroundColor: '#ddd',
            borderRadius: 10,
            padding: 10,
            fontSize: 20,
            textAlign: 'center',
          },
          borderRadius: 7,
          textInput: {
            fontSize: 17,
            color: '#5d5d5d',
            backgroundColor: 'transparent',
            fontSize: 16,
            textAlign:'center',
          },
          listView:{
            width: '80%',
          },
        }}
      />
      <Button bg="#528cfd" onPress={updateProfile}>
        <ButtonText color="#f1f1f1">Atualizar</ButtonText>
      </Button>
      </ModalContainer>
      </Modal>

    </Container>
  );
}
