import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome.js';
import {TagLabel} from '../form/tags/index.js';
import t from '../../localization/index.js';
import {boxShadow, textStyle} from '../../mixin.js';

const styles = StyleSheet.create({
  cards: {
    backgroundColor: '#FFFFFF',
    ...boxShadow(4, 4),
    borderRadius: 10,
    width: 336,
    height: 70,
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textCards: {
    ...textStyle('500', 13, 20),
    letterSpacing: 1,
    padding: 10,
  },
});

const TextBox = ({
  children,
  onCompleteTask,
  onReminderTask,
  overdue,
  ...props
}) => {
  return (
    <TouchableOpacity {...props} testID={'card_test'}>
      <View style={styles.cards}>
        {overdue ? (
          <View style={{display: 'flex', flexDirection: 'column'}}>
            <Text style={{...styles.textCards}}>{children}</Text>
            <TagLabel name={t.overdue} width={70} />
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
