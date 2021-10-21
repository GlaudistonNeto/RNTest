import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from "./createDataContext";
import axios from '../services/axios';

const authReducer = (state, action) => {
  switch (action.type) {
    case  'add_error':
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const signup = dispatch => {
  return async ({ name, age, city, email, password, confirmPassword }) => {
    try {
      const res = await axios.post('/signup', {
      name,
      age,
      city,
      latitude,
      longitude,
      email,
      password,
      confirmPassword
      });
      await AsyncStorage.setItem('token', data.token);
      dispatch({ type: 'signup', payload: data.token });
    } catch (err) {
      dispatch({ type: 'add_error', payload: 'Something went wrong' });
    }
  }
}

const signin = dispatch => {
  return ({ email, password }) => {}
}

const signout = dispatch => {
  return () => {}
}

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signup,
    signin,
    signout
  },
  { token: null, errorMessage: '' }
);
