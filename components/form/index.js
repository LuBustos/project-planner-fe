import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
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
import t from '../../localization';
import DatePickerField from './date';
import Tags from './tags';
import {updateData} from '../../utils/storage';

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
    paddingLeft: 10,
    paddingBottom: 5,
  },
  textDate: {
    ...textStyle('400', 15, 22),
  },
  label: {
    ...textStyle('600', 15, 22),
    color: '#F2994A',
    margin: 5,
    marginLeft: 10,
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
  dueDate: null,
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
  const {imageGallery, openGallery} = useImages();
  const [users, setUsers] = useState([]);
  const [userValue, setUserValue] = useState([]);
  const [openDropwdown, setOpenDropwdown] = useState(false);

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
      successMessage('The task has been removed');
    } else {
      errorMessage(response.message);
    }
  };

  const getTask = async id => {
    const response = await getTaskById(id);
    if (response.success) {
      const task = {
        title: response.data.title,
        description: response.data.description,
        to: response.data.users,
        tags: response.data.tags,
        dueDate: response.data.dueDate,
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
                onError={() => {
                  user.avatar = null;
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
        await updateData();
        successMessage(response.message);
        refreshScreen();
        onClose();
      } else {
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
            <Text style={stylesForm.title}>{update ? t.opgave : t.c_task}</Text>
          </View>
          <TouchableOpacity
            style={{marginLeft: 'auto'}}
            onPress={closeModalWithoutSave}>
            <Icon name={'close'} size={30} />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <TouchableOpacity
            onPress={() => setOpenDropwdown(false)}
            activeOpacity={1}>
            <View style={{minHeight: 500, alignSelf: 'center'}}>
              <InputForm
                label={t.titel}
                onChange={onChangeFields}
                value={fields.title}
                name={'title'}
                styles={stylesForm}
              />
              <InputMultilineForm
                label={t.beskrivelse}
                onChange={onChangeFields}
                value={fields.description}
                name={'description'}
                styles={stylesForm}
              />
              <SelectForm
                label={t.modtager}
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
              <Tags
                label={t.tags}
                onChange={onChangeFields}
                value={fields.tags}
                name={'tags'}
                styles={stylesForm}
              />
              <DatePickerField
                label={t.afleveringsdato}
                name={'dueDate'}
                onChange={onChangeFields}
                styles={stylesForm}
                value={fields.dueDate}
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
                      marginTop: 10,
                    }}
                  />
                </TouchableOpacity>

                {update ? (
                  <TouchableOpacity onPress={removeTask}>
                    <Delete
                      style={{
                        marginRight: 20,
                        marginTop: 10,
                      }}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Button
            onPress={submit}
            text={update ? t.gem : t.opret}
            theme={theme}
          />
        </View>
      </View>
    </Modal>
  );
};

export default Form;
