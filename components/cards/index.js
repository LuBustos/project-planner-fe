import {Text, TouchableOpacity, View} from 'react-native';
import styles from '../../styles.js';

const TextBox = ({children,...props}) => {
  return (
    <TouchableOpacity {...props}>
      <View style={styles.cards}>
        <Text style={styles.textCards}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TextBox;
