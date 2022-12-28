import axios from 'axios';

const local = 'http://localhost:3001/api';

export const getTask = async (id,body) => {
  try {
    const url = `${local}/task/list?id=${id}`;
    const response = await axios.post(url,body);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return error.response
  }
};

export const getTaskById = async id => {
    try {
      const url = `${local}/show-task?id=${id}`;
      const response = await axios.get(url);
      if (response.status === 200) {
        return response.data;
      }
      return {success: false, data: []};
    } catch (error) {
      return error.response
    }
  };

export const createTask = async body => {
    try {
      const url = `${local}/task`;
      const response = await axios.post(url,body);
      if (response.status === 200) {
        return response.data;
      }
      return {success: false, message: 'Ops!'};
    } catch (error) {
      return error.response
    }
};

export const updateTask = async (body,task_id) => {
  try {
    const url = `${local}/update-task?id=${task_id}`;
    const response = await axios.put(url,body);
    if (response.status === 200) {
      return response.data;
    }
    return {success: false, message: 'Ops!'};
  } catch (error) {
    return error.response
  }
};

export const updateTaskStatus = async (id,status) => {
  try{
    const url = `${local}/update-task-status`;
    const response = await axios.put(url,{id,status});
    if (response.status === 200) {
      return response.data;
    }
    return {success: false, message: 'Ops!'};
  }catch(error){
    return error.response
  }
}
