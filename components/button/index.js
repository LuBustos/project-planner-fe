import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import { boxShadow, textStyle } from '../../mixin';

const styles = StyleSheet.create({
  button: {
    ...boxShadow(8, 4, 0.17),
    borderRadius: 25.1953,
    height: 53,
    width: 220,
    marginBottom: 23,
  },
  textButton: {
    position: 'absolute',
    left: '15%',
    right: '15.45%',
    top: '30.19%',
    bottom: '30.19%',
    ...textStyle('700', 15.1172, 23),
    textAlign: 'center',
  },
});

const Button = ({onPress, text, theme, ...props}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.button,
        backgroundColor: theme.backgroundButton,
      }}
      {...props}>
      <Text style={{...styles.textButton, color: theme.text}}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
