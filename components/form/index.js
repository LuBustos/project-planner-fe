import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
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
import {getUsers} from '../../services/user.service';
import User from '../../assets/user';
import {InputForm, InputMultilineForm} from './input';
import SelectForm from './select';
import {errorMessage, successMessage} from '../../utils/snackbar';

const stylesForm = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
    height: '100%',
    padding: 20,
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
  },
  item: {
    margin: 5,
  },
});

const initial_form = {
  title: '',
  description: '',
  to: [],
  tags: '',
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
      refreshScreen();
      onClose();
      successMessage("The task has been removed");
    }else{
      errorMessage(response.message)
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

  const validateFields = fields => {
    if (fields.title.length < 2) {
      return {success: false, message: 'Title too short'};
    }

    if (fields.title.length > 20) {
      return {success: false, message: 'Title too long'};
    }

    if (fields.to.length === 0) {
      return {success: false, message: 'No users selected'};
    }

    return {success: true, message: 'good'};
  };

  const submit = async () => {
    const validation = validateFields(fields);
    if (validation.success) {
      const uri =
        Platform.OS === 'ios'
          ? imageGallery?.fileUri.replace('file://', '')
          : imageGallery?.fileUri;

      const data = {
        ...fields,
        created_by: owner,
        image: uri,
      };

      if (!imageGallery) {
        delete data.image;
      }

      let response = {};

      if (!update) {
        response = await createTask(data);
      } else {
        response = await updateTask(data, task_id);
      }

      if (response.success) {
        successMessage(response.message);
        refreshScreen();
        onClose();
      }else{
        errorMessage(response.message);
      }

    } else {
      errorMessage(validation.message);
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
      <View style={stylesForm.container}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 56,
            marginBottom: 37,
          }}>
          <View style={{marginLeft: 'auto'}}>
            <Text style={stylesForm.title}>
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
              styles={stylesForm}
            />
            <InputMultilineForm
              label={'Beskrivelse . . .'}
              onChange={onChangeFields}
              value={fields.description}
              name={'description'}
              styles={stylesForm}
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
              styles={stylesForm}
            />
            <InputForm
              label={'Tags'}
              onChange={onChangeFields}
              value={fields.tags}
              name={'tags'}
              styles={stylesForm}
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
