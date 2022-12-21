import {Text, TouchableOpacity, View} from 'react-native';
import styles from '../../styles.js';
// import { Icon } from 'react-native-vector-icons/Icon.js';
// import 'react-native-vector-icons/FontAwesome5.js';
import Icon from 'react-native-vector-icons/FontAwesome.js';

const TextBox = ({children, ...props}) => {
  return (
    <TouchableOpacity {...props}>
      <View style={styles.cards}>
        <Text style={styles.textCards}>{children}</Text>
        <Icon
          name="check"
          style={{
            color: '#27AE60',
            position: 'absolute', // Check
            left: '90%',
          }}
          size={20}
        />
      </View>
    </TouchableOpacity>
  );
};

export default TextBox;
