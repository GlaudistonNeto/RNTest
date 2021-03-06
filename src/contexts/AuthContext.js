import createDataContext from "./createDataContext";
import axios from '../services/axios';

const authReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const signup = dispatch => {
  return async ({ name, age, city, latitude, longitude, email, password, confPassword }) => {
    try {
      const sta = await axios.post('/signup', {
      name,
      age,
      city,
      latitude,
      longitude,
      email,
      password,
      confPassword
      });
      console.log(sta.status);
    } catch (err) {
      console.log(err);
    }
  }
}

const signin = dispatch => {
  try {
    const res = await axios.post('signin', {
      email,
      password
    });
    console.log(data);
  } catch (err) {
    console.log(err);
  }
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
  { isSignedIn: false }
);
