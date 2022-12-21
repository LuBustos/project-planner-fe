import {Text, TouchableOpacity} from 'react-native';
import styles from '../../styles';

const Button = ({onPress, text, theme, props}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{...styles.button, backgroundColor: theme.backgroundButton}}
      {...props}>
      <Text style={{...styles.textButton, color: theme.text}}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
