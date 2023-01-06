import {useEffect, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';

const formatDate = value => {
  const date = new Date(value);
  return (
    date.getDate() +
    '-' +
    parseInt(date.getMonth() + 1) +
    '-' +
    date.getFullYear()
  );
};

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
    onChange(name, date);
  };

  return (
    <View style={{height: value ? 90 : 70}}>
      {value ? <Text style={styles.label}>{label}</Text> : null}
      <TouchableOpacity
        style={{...styles.input, height: 52}}
        onPress={() => setOpen(true)}>
        <TextInput
          style={{...styles.textDate,paddingTop: 12}}
          value={
            value
              ? mode != 'date'
                ? new Date(value).toLocaleTimeString()
                : formatDate(value)
              : null
          }
          editable={false}
          placeholder={label}
          onPressIn={() => setOpen(true)}
        />
      </TouchableOpacity>
      <DatePicker
        modal
        date={value ? new Date(value) : today}
        mode={mode}
        open={open}
        onConfirm={date => onConfirmModal(date)}
        minimumDate={today}
        placeholder="select date"
        format="DD-MM-YYYY"
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
};

export default DatePickerField;
