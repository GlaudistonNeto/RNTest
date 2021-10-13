/* eslint-disable prettier/prettier */
import React, {useState, createContext, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

function AuthProvider({children}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingAuth, setLoadingAuth] = useState(false);

  useEffect(() => {
    async function loadStorage() {
      const storageUser = await AsyncStorage.getItem('begrato');

      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }

      setLoading(false);
    }

    loadStorage();
  }, []);

  async function signIn(email, password) {
    setLoadingAuth(true);

    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(async value => {
        let uid = value.user.uid;
        // Look for Username
        const userProfile = await firestore()
          .collection('users')
          .doc(uid)
          .get();

        let data = {
          uid: uid,
          name: userProfile.data().name,
          age: userProfile.data().age,
          city: userProfile.data().city,
          value: value.user.email,
        };

        setUser(data);
        storageUser(data);
        setLoadingAuth(false);
      })
      .catch(error => {
        alert(error);
        setLoadingAuth(false);
      });
  }

  async function signUp(
    email,
    password,
    confPassword,
    name,
    age,
    city,
    latitude,
    longitude,
  ) {
    setLoadingAuth(true);
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async value => {
        let uid = value.user.uid;
        await firestore()
          .collection('users')
          .doc(uid)
          .set({
            name: name,
            age: age,
            city: city,
            latitude: latitude,
            longitude: longitude,
          })
          .then(result => {
            let data = {
              uid: uid,
              name: name,
              age: age,
              city: city,
              email: value.user.email,
              latitude: latitude,
              longitude: longitude,
            };
            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
          });
      })
      .catch(error => {
        alert(error);
        setLoadingAuth(false);
      });
  }

  async function signOut() {
    await auth().signOut();
    await AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  async function storageUser(data) {
    await AsyncStorage.setItem('begrato', JSON.stringify(data));
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loadingAuth,
        loading,
        signUp,
        signIn,
        signOut,
        storageUser,
        setUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
