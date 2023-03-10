import {useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome.js';
import t from '../../localization';
import {textStyle} from '../../mixin';
import {onCreateTriggerNotification} from '../../utils/notify';
import {errorMessage, successMessage} from '../../utils/snackbar';
import Button from '../button';
import DatePickerField from '../form/date';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
    width: 375,
    height: 436,
    marginTop: 70,
    alignSelf: 'center',
    padding: 20,
  },
  title: {
    ...textStyle('700', 20, 30),
    letterSpacing: 3,
  },
  text: {
    ...textStyle('500', 14, 21),
    letterSpacing: 2,
    textAlign: 'center',
    color: '#000000',
  },
  input: {
    borderColor: '#BDBDBD',
    borderWidth: 1,
    borderRadius: 15,
    width: 241,
    marginBottom: 10,
    paddingLeft: 10,
    paddingBottom: 5,
  },
  label: {
    ...textStyle('600', 15, 22),
    color: '#F2994A',
    margin: 5,
  },
  textDate: {
    ...textStyle('400', 15, 22),
  },
});

const ReminderModal = ({visible, onClose, theme, fields}) => {
  const [reminder, setReminder] = useState(null);

  const handlerReminder = (_, date) => {
    setReminder(date);
  };

  const onSubmit = async () => {
    try {
      const response = await onCreateTriggerNotification(reminder, fields);
      if (response) {
        successMessage(t.reminder_saved);
        onClose();
      }
    } catch (error) {
      errorMessage(error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.container}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 56,
            marginBottom: 37,
          }}>
          <View style={{marginLeft: 'auto'}}>
            <Text style={styles.title}>{t.reminder}</Text>
          </View>
          <TouchableOpacity style={{marginLeft: 'auto'}} onPress={onClose}>
            <Icon name={'close'} size={25} />
          </TouchableOpacity>
        </View>
        <View style={{alignSelf: 'center'}}>
          <DatePickerField
            label={t.reminder}
            name={'reminder'}
            onChange={handlerReminder}
            styles={styles}
            value={reminder}
            mode={'time'}
          />
        </View>
        <View style={{alignSelf: 'center', marginTop: 25}}>
          <Button theme={theme} text={t.gem} onPress={onSubmit} />
        </View>
      </View>
    </Modal>
  );
};

export default ReminderModal;
