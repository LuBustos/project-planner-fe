import axios from 'axios';
import { Platform } from 'react-native';
import Config from "react-native-config";

console.log(Config)

const local = Platform.OS === "ios" ? Config.URL_BACKEND_IOS : Config.URL_BACKEND_ANDROID;

export const getUserById = async id => {
  try {
    const url = `${local}/profile?id=${id}`;
    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data;
    }
    return {success: false, message: 'Ops!'};
  } catch (error) {
    console.log(error);
    return error.response?.data;
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
    const updatePassword = body.password.length > 0 ? true : false;
    const response = await axios.put(url, {
      ...body,
      updatePassword: updatePassword,
    });
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
    console.log(error);
    if (error.response) {
      return error.response.data;
    }

    return {succces: false, message: error};
  }
};
