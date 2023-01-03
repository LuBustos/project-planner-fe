import {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';

const DatePickerField = ({
  label,
  styles,
  onChange,
  name,
  value,
  mode = 'date',
}) => {
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

    if (mode !== 'date') {
      onChange(name, date);
    } else {
      onChange(name, formatDate);
    }
  };

  return (
    <View style={{height: value ? 90 : 70}}>
      {value ? <Text style={styles.label}>{label}</Text> : null}
      <TouchableOpacity
        style={{...styles.input, height: 52, padding: 10}}
        onPress={() => setOpen(true)}>
        <TextInput
          style={{...styles.textDate}}
          value={
            value
              ? mode != 'date'
                ? new Date(value).toLocaleTimeString()
                : value
              : null
          }
          editable={false}
          placeholder={label}
          onPressIn={() => setOpen(true)}
        />
      </TouchableOpacity>
      <DatePicker
        modal
        date={value ? new Date(value) : new Date(today)}
        mode={mode}
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
