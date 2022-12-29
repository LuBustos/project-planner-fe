import axios from 'axios';

const local = 'http://localhost:3001/api';

export const getUserById = async id => {
  try {
    const url = `${local}/profile?id=${id}`;
    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data;
    }
    return {success: false, message: 'Ops!'};
  } catch (error) {
    return error.response.data;
  }
};

export const createUser = async body => {
  try {
    const url = `${local}/user`;

    const data = {
      username: body.username.trim().toLowerCase(),
      password: body.password,
    };

    const response = await axios.post(url, data);
    if (response.status === 200) {
      return response.data;
    }
    return {success: false, message: 'Ops!'};
  } catch (error) {
    return error.response.data;
  }
};

export const updateUser = async (userId, body) => {
  try {
    const url = `${local}/update-user?id=${userId}`;
    const response = await axios.put(url, {...body});
    if (response.status === 200) {
      return response.data;
    }
    return {success: false, message: 'Ops!'};
  } catch (error) {
    return error.response.data;
  }
};

export const updateAvatar = async (userId, body) => {
  try {
    const url = `${local}/update-avatar?id=${userId}`;
    const response = await axios.put(url, {form: body});
    if (response.status === 200) {
      return response.data;
    }
    return {success: false, message: 'Ops!'};
  } catch (error) {
    return error.response.data;
  }
};

export const getUsers = async () => {
  try {
    const url = `${local}/user/list`;
    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data;
    }
    return {success: false, message: 'Ops!'};
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
    return {success: false, message: 'Ops!'};
  } catch (error) {
    return error.response.data;
  }
};
