import {Text, TouchableOpacity, View} from 'react-native';
import styles from '../../styles.js';
// import { Icon } from 'react-native-vector-icons/Icon.js';
// import 'react-native-vector-icons/FontAwesome5.js';
import Icon from 'react-native-vector-icons/FontAwesome.js';

const TextBox = ({children,onCompleteTask, ...props}) => {
  return (
    <TouchableOpacity {...props}>
      <View style={styles.cards}>
        <Text style={styles.textCards}>{children}</Text>
        <TouchableOpacity onPress={onCompleteTask} style={{marginLeft:'auto',marginRight:20}}>
          <Icon
            name="check"
            style={{
              color: '#27AE60',
            }}
            size={20}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default TextBox;
