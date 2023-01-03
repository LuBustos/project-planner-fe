import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@storage_user');
    return value != null ? JSON.parse(value) : null;
  } catch (e) {
    console.log(e);
  }
};

export const updateData = async () => {
  try {
    const data = await AsyncStorage.getItem('@storage_user');
    let obj = JSON.parse(data);
    obj.isFirstTime = false;
    await AsyncStorage.setItem('@storage_user', JSON.stringify(obj));
  } catch (error) {
    console.log(error);
  }
};

export const saveData = async (id, isFirstTime) => {
  try {
    const jsonValue = JSON.stringify({
      id: 1,
      userId: id,
      isFirstTime: isFirstTime,
    });
    await AsyncStorage.setItem('@storage_user', jsonValue);
  } catch (error) {
    console.log(error);
  }
};

export const removeData = async () => {
  try {
    await AsyncStorage.removeItem('@storage_user');
  } catch (error) {
    console.log(error);
  }
};
