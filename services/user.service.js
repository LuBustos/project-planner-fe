import axios from 'axios';

const local = 'http://localhost:3001/api';

export const getUserById = async id => {
  const url = `${local}/profile?id=${id}`;
  const response = await axios.get(url);
  if (response.status === 200) {
    return response.data;
  }
  return [];
};

export const createUser = async body => {
  try {
    const url = `${local}/user`;
    const response = await axios.post(url, body);
    if (response.status === 200) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.log(error);
    return {message: error, success: false};
  }
};

export const updateUser = async (userId, body) => {
  try {
    const url = `${local}/update-user?id=${userId}`;
    const response = await axios.put(url, {form: body});
    console.log('LA RESPN', response);
    if (response.status === 200) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.log('el error', error);
    return {message: error, success: false};
  }
};

export const getUsers = async () => {
  try {
    const url = `${local}/user/list`;
    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data;
    } else {
      return response.data;
    }
  } catch (error) {
    return error.reponse.data;
  }
};

export const login = async body => {
  try {
    const url = `${local}/login`;
    const response = await axios.post(url, body);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return error.response.data;
  }
};
