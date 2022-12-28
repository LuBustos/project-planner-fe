import Snackbar from "react-native-snackbar";

export const errorMessage = message => {
  Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_LONG,
    backgroundColor: 'rgb(211, 47, 47)',
    textColor: 'white',
  });
};

export const successMessage = message => {
  Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_LONG,
    backgroundColor: '#27AE60',
    textColor: 'white',
  });
};
