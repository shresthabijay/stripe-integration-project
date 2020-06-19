import axios from "./axios";

export const login = ({ email, password }) => axios.post('/user/login', { email, password });

export const signup = ({ name, email, password }) => axios.post('/user/signup', { name, email, password });

export const userDetail = () => axios.get('/user/detail');