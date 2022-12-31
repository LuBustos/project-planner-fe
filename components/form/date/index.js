import {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';

const DatePickerField = ({label, styles, onChange, name, value}) => {
  const [open, setOpen] = useState(false);

  const today = new Date();

  const onConfirmModal = date => {
    setOpen(false);
    const formatDate =
      date.getDate() +
      '-' +
      parseInt(date.getMonth() + 1) +
      '-' +
      date.getFullYear();

    onChange(name, formatDate);
  };

  return (
    <View style={{height: 100}}>
      {value ? <Text style={styles.label}>{label}</Text> : null}
      <TouchableOpacity
        style={{...styles.input, height: 52,padding: 10}}
        onPress={() => setOpen(true)}>
        <TextInput
          style={{...styles.textDate}}
          value={value}
          editable={false}
          placeholder={label}
        />
      </TouchableOpacity>
      <DatePicker
        modal
        date={value ? new Date(value) : new Date(today)}
        mode="date"
        open={open}
        onConfirm={date => onConfirmModal(date)}
        minimumDate={new Date(today)}
        placeholder="select date"
        format="DD/MM/YYYY"
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
};

export default DatePickerField;
