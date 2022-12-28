import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
} from 'react-native';
import {textStyle} from '../../mixin';
import Button from '../button';
import {useEffect, useState} from 'react';
import {useFields, useImages} from '../../hooks';
import {
  createTask,
  getTaskById,
  updateTask,
  updateTaskStatus,
} from '../../services/task.service';
import ImageSvg from '../../assets/image';
import Delete from '../../assets/delete';
import Icon from 'react-native-vector-icons/FontAwesome.js';
import DropDownPicker from 'react-native-dropdown-picker';
import {getUsers} from '../../services/user.service';
import User from '../../assets/user';

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
  },
});

const initial_form = {
  title: '',
  description: '',
  to: [],
  tags: '',
};

const InputForm = ({label, value, onChange, name}) => {
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

const SelectForm = ({
  value,
  label,
  onChange,
  name,
  users,
  setUsers,
  owner,
  setUserValue,
  userValue,
  open,
  setOpen,
}) => {
  useEffect(() => {
    onChange(name, userValue);
  }, [userValue]);

  return (
    <>
      {value.length > 0 ? <Text style={styles.label}>{label}</Text> : null}
      <DropDownPicker
        open={open}
        value={userValue}
        items={users}
        setOpen={setOpen}
        style={{...styles.input, height: 52}}
        setValue={setUserValue}
        setItems={setUsers}
        multiple={true}
        mode={'BADGE'}
        autoScroll={true}
        renderBadgeItem={props => {
          const {IconComponent, label, value} = props;
          return (
            <View style={{margin: 5}} {...props}>
              <IconComponent />
              <Text>{owner !== value ? label : '(Mig)'}</Text>
            </View>
          );
        }}
        dropDownDirection="TOP"
        dropDownContainerStyle={{
          ...styles.input,
        }}
        // searchable={true}
      />
    </>
  );
};

const InputMultilineForm = ({label, value, onChange, name}) => {
  return (
    <View>
      {value.length > 0 ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        style={{...styles.input, height: 100}}
        placeholder={label}
        multiline
        numberOfLines={4}
        onChangeText={text => onChange(name, text)}
        value={value}
      />
    </View>
  );
};

const STATUS_TASK = {
  COMPLETED: 2,
  REMOVED: 3,
};

const Form = ({
  visible,
  update,
  onClose,
  theme,
  owner,
  refreshScreen,
  task_id,
}) => {
  const {fields, onChangeFields, saveAllFields} = useFields(initial_form);
  const [users, setUsers] = useState([]);
  const [userValue, setUserValue] = useState([]);
  const [openDropwdown, setOpenDropwdown] = useState(false);
  const {imageGallery, openGallery} = useImages();

  //on close setFields(null)
  useEffect(() => {
    getAllUsers();
    if (update) {
      getTask(task_id);
    } else {
      setUserValue([owner]);
    }
  }, []);

  const removeTask = async () => {
    const response = await updateTaskStatus(task_id, STATUS_TASK.REMOVED);
    if (response.success) {
      //Show alert :D
      refreshScreen();
      onClose();
    }
  };

  const getTask = async id => {
    const response = await getTaskById(id);
    if (response.success) {
      const task = {
        title: response.data.title,
        description: response.data.description,
        to: response.data.users,
        tags: '',
      };
      saveAllFields(task);
      setUserValue(task.to);
    }
  };

  const getAllUsers = async () => {
    const response = await getUsers();
    if (response.success) {
      const userList = response.data.map(user => {
        let user_obj = {
          label: user.id === owner ? 'Mig' : user.label,
          value: user.value,
          icon: () =>
            !user.avatar ? (
              <User
                style={{
                  width: 27,
                  height: 27,
                  alignSelf: 'center',
                }}
              />
            ) : (
              <Image
                source={{uri: user.avatar}}
                style={{
                  width: 27,
                  height: 27,
                  alignSelf: 'center',
                  borderRadius: 150 / 2,
                }}
              />
            ),
        };

        return user_obj;
      });
      setUsers(userList);
    }
  };

  const submit = async () => {
    console.log(imageGallery);

    const uri =
      Platform.OS === 'ios'
        ? imageGallery.fileUri.replace('file://', '')
        : imageGallery.fileUri;

    const data = {
      ...fields,
      created_by: owner,
      image: uri,
    };

    if (!update) {
      const response = await createTask(data);
      if (response.success) {
        refreshScreen();
        onClose();
        //Show messsage, task created sth similar
      }
    } else {
      const response = await updateTask(data, task_id);
      if (response.success) {
        refreshScreen();
        onClose();
      }
    }
  };

  const closeModalWithoutSave = () => {
    onClose();
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
            <Text style={styles.title}>
              {update ? 'Opgave' : 'Opret opgave'}
            </Text>
          </View>
          <TouchableOpacity
            style={{marginLeft: 'auto'}}
            onPress={closeModalWithoutSave}>
            <Icon name={'close'} size={30} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => setOpenDropwdown(false)}
          activeOpacity={1}>
          <View style={{minHeight: 500}}>
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
            <SelectForm
              label={'Modtager(e)'}
              value={fields.to}
              name={'to'}
              users={users}
              setUsers={setUsers}
              owner={owner}
              onChange={onChangeFields}
              setUserValue={setUserValue}
              userValue={userValue}
              setOpen={setOpenDropwdown}
              open={openDropwdown}
            />
            <InputForm
              label={'Tags'}
              onChange={onChangeFields}
              value={fields.tags}
              name={'tags'}
            />
            <View
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <TouchableOpacity onPress={openGallery}>
                <ImageSvg
                  style={{
                    marginLeft: 20,
                  }}
                />
              </TouchableOpacity>
              {update ? (
                <TouchableOpacity onPress={removeTask}>
                  <Delete
                    style={{
                      marginRight: 20,
                    }}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Button
            onPress={submit}
            text={update ? 'Gem' : 'Opret'}
            theme={theme}
          />
        </View>
      </View>
    </Modal>
  );
};

export default Form;
