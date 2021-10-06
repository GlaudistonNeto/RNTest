import React, { useState, createContext } from 'react';
import axios from '../services/axios';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // axios.get('/').then((res) => {
  //   console.log(res.data);
  // });

  const signUp = dispatch => {
    return async ({ name, age, city, email, password, confirmPassword }) => {
      try {
        const res = await axios.post('signup',{
          name, age, city, email, password, confirmPassword 
        })
      } catch (err) {
        console.log(err.msg)
      }
    };
  };

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
