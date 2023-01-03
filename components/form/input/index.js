import {Text, TextInput, View} from 'react-native';

export const InputForm = ({label, value, onChange, name,styles}) => {
  return (
    <View>
      {value.length > 0 ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        onChangeText={text => onChange(name, text)}
        style={{...styles.input, height: 52}}
        placeholder={label}
        value={value}
      />
    </View>
  );
};

export const InputMultilineForm = ({label, value, onChange, name,styles}) => {
  return (
    <View>
      {value.length > 0 ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        style={{...styles.input, height: 100,marginBottom: value.length > 0 ? 0 : 10}}
        placeholder={label}
        multiline
        numberOfLines={4}
        onChangeText={text => onChange(name, text)}
        value={value}
      />
    </View>
  );
};
