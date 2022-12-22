import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {textStyle} from '../../mixin';
import Button from '../button';
import {useEffect, useState} from 'react';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
    // height: 666,
    // width: 383,
    height: '100%',
    padding: 20,
    //     position: "absolute",
    // top: "5%",
    // left: "1%",
  },
  title: {
    ...textStyle('700', 20, 30),
    letterSpacing: 3,
    textAlign: 'center',
    marginTop: 56,
    marginBottom: 37,
  },
  input: {
    borderColor: '#BDBDBD',
    borderWidth: 1,
    borderRadius: 15,
    width: 341,
    marginBottom: 23,
    ...textStyle('300', 15, 22),
    paddingLeft: 10,
    paddingBottom: 5,
  },
  label: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 22,
    color: '#F2994A',
    margin: 5,
    '&focus': {
      color: 'red !important',
    },
  }
});

const initial_form = {
  title: '',
  description: '',
  users: '',
  tags: '',
};

const InputForm = ({label, value, onChange,name}) => {
  console.log(value)
  return (
    <View>
      {value.length > 0 ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        onChangeText={text => onChange(name, text)}
        style={{...styles.input, height: 52}}
        placeholder={label}
      />
    </View>
  );
};

const InputMultilineForm = ({label, value, onChange,name}) => {
  return (
    <View>
      {value.length > 0 ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        style={{...styles.input, height: 100}}
        placeholder={label}
        multiline
        numberOfLines={4}
        onChangeText={text => onChange(name, text)}
      />
    </View>
  );
};

const Form = ({visible, update, onClose, theme}) => {
  const [fields, setFields] = useState(initial_form);

  //on close setFields(null)
  useEffect(() => {
    if (update) {
      //GET INFO
    }
  }, []);

  console.log(update);

  const onChangeFields = (name, value) => {
    setFields({
      ...fields,
      [name]: value,
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{update ? 'Opgave' : 'Opret opgave'}</Text>
          <View>
            <InputForm
              label={'Titel'}
              onChange={onChangeFields}
              value={fields.title}
              name={'title'}
            />
            <InputMultilineForm
              label={'Beskrivelse . . .'}
              onChange={onChangeFields}
              value={fields.description}
              name={'description'}

            />
            <InputForm
              label={'Modtager(e)'}
              onChange={onChangeFields}
              value={fields.users}
              name={'users'}
            />
            <InputForm
              label={'Tags'}
              onChange={onChangeFields}
              value={fields.tags}
              name={'tags'}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Button
            onPress={onClose}
            text={update ? 'Gem' : 'Opret'}
            theme={theme}
          />
        </View>
      </View>
    </Modal>
  );
};

export default Form;
