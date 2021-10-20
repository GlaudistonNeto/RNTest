import createDataContext from "./createDataContext";
import axios from '../services/axios';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const signup = dispatch => {
  return async ({
                  name,
                  age,
                  city,
                  latitude,
                  longitude,
                  email,
                  password,
                  confPassword
                }) => {
    try {
      const res = await axios.post('/signup', {
        name,
        age,
        city,
        latitude,
        longitude,
        email,
        password,
        confPassword
      });
      console.log(data);
    } catch (err) {
      dispatch({ type: 'add_error', payload: 'something is wrong here...' });
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
  { isSignedIn: false, errorMessage: '' }
);
