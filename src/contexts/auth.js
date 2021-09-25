import React, { useState, createContext } from 'react';
import axios from '../services/axios';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // axios.get('/').then((res) => {
  //   console.log(res.data);
  // });

  async function signUp(name, age, city, email, password, confirmPassword) {
    await axios.post('/signup', {
      name,
      age,
      city,
      latitude,
      longitude,
      email,
      password,
      confirmPassword
    }).then( async (value) => {
      let uid = value.data.uid;
      data.set({
        name,
        age,
        city
      })
      .then( () => {
        let data = {
          uid: uid,
          name: name,
          age: age,
          city: city,
          email: email,
          password: password
        };

        setUser(data);
      })
    } )
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
