import createDataContext from "./createDataContext";
import axios from '../services/axios';

const authReducer = (state, action) => {
  switch (action.type) {
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
<<<<<<< HEAD
      latitude,
      longitude,
=======
>>>>>>> 12e435f5487132f2dd5a6b91775c57cf2eaadbde
      email,
      password,
      confirmPassword
      });
      console.log(res.data);
    } catch (err) {console.log(err.msg)}
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
  { isSignedIn: false }
);
