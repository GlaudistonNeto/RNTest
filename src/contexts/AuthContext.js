import creteDataContext from './createDataContext';
import axios from '../services/axios';

const authReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const signUp = dispatch => {
  return async ({ name, age, city, email, password, confirmPassword }) => {
    try {
      const res = await axios.post('/signup', {
        name,
        age,
        city,
        email,
        password,
        confirmPassword
      })
      console.log(res.data);
    } catch (err) {
      console.log(err.msg)
    }
  }
}

const signIn = dispatch => {
  return ({ email, password }) => {

  }
}

const signOut = dispatch => {
  return () => {

  }
}

export const { Provider, Context } = creteDataContext(
  authReducer,
  { signUp, signIn, signOut },
  { isSignedIn: false }
);
