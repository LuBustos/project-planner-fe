import {Alert} from 'react-native';

const customAlert = ({
  title,
  pressContinue,
  pressCancel,
  cancelText,
  continueText,
}) => {
  return Alert.alert(title, [
    {
      text: cancelText,
      onPress: pressCancel,
      style: 'cancel',
    },
    {text: continueText, onPress: pressContinue},
  ]);
};

export default customAlert;
