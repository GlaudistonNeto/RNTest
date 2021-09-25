import axios from 'axios';

const instance = axios.create({
    // baseURL: 'https://begrato.herokuapp.com'
    baseURL: 'https://fathomless-anchorage-78914.herokuapp.com'
});

export default instance;
