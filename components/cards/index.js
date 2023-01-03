import {Text, TouchableOpacity, View} from 'react-native';
import styles from '../../styles.js';
import Icon from 'react-native-vector-icons/FontAwesome.js';
import {TagLabel} from '../form/tags/index.js';

const TextBox = ({
  children,
  onCompleteTask,
  onReminderTask,
  overdate,
  ...props
}) => {
  return (
    <TouchableOpacity {...props} testID={'card_test'}>
      <View style={styles.cards}>
        {overdate ? (
          <View style={{display: 'flex', flexDirection: 'column'}}>
            <Text style={{...styles.textCards}}>{children}</Text>
            <TagLabel name={'overdate'} width={70} />
          </View>
        ) : (
          <Text style={{...styles.textCards}}>{children}</Text>
        )}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginLeft: 'auto',
            marginRight: 20,
          }}>
          <TouchableOpacity
            onPress={onReminderTask}
            style={{marginRight: 10}}
            testID={'reminder_test'}>
            <Icon
              name="clock-o"
              style={{
                color: '#e47200',
              }}
              size={20}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onCompleteTask} testID={'complete_test'}>
            <Icon
              name="check"
              style={{
                color: '#27AE60',
              }}
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TextBox;
