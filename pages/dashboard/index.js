import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Header from '../../components/header';
import {useTheme} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {TextBox} from '../../components/';
import {textStyle} from '../../mixin';
import EmptyMessage from '../../components/empty';
import Icon from 'react-native-vector-icons/FontAwesome.js';
import ModalForm from '../../components/form';
import {getTask, updateTaskStatus} from '../../services/task.service';
import {errorMessage, successMessage} from '../../utils/snackbar';
import {getUserById} from '../../services/user.service';
import GuestModal from '../../components/modal/guest';

const styles = StyleSheet.create({
  title: {
    ...textStyle('600', 18, 27),
    letterSpacing: 1,
    marginLeft: 27,
    marginBottom: 23,
  },
});

const COMPLETED = 2;

const Dashboard = props => {
  const {
    route: {params},
  } = props;
  const {colors} = useTheme();
  const [tasks, setTasks] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [open, setOpen] = useState({open: false, update: false, task_id: null});
  const [refresh, setRefresh] = useState(false);
  const [modalGuest, setModalGuest] = useState(false);
  const [filterOptions, setFilterOptions] = useState([
    {message: null, options: []},
  ]);

  useEffect(() => {
    if (!params.userId) {
      setModalGuest(true);
    }
  }, []);

  useEffect(() => {
    if (params.userId) {
      Promise.all(
        getAllTask(params.userId, filterOptions),
        getProfile(params.userId),
      );
    }
  }, [refresh, filterOptions]);

  const getAllTask = async id => {
    const response = await getTask(id, filterOptions); //we should transform this in a post!
    setTasks(response.data);
  };

  const getProfile = async id => {
    const response = await getUserById(id);
    setProfilePhoto(response.data.avatar);
  };

  const createOrUpdateTask = (update = false, task_id) => {
    setOpen({open: true, update: update, task_id: task_id});
  };

  const closeModal = () => {
    setOpen({open: false, update: false, task_id: null});
  };

  const handlerFilters = value => {
    setFilterOptions(value);
  };

  const refreshScreen = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 250);
  };

  const completeTask = async id => {
    const response = await updateTaskStatus(id, COMPLETED);
    if (response.success) {
      successMessage(response.message);
      refreshScreen();
    } else {
      errorMessage(response.message);
    }
  };

  return (
    <View style={{flex: 1, height: '100%'}}>
      <Header
        header_style={{
          left: -55,
          top: -120,
        }}
        height="65%"
        isFilter
        theme={colors}
        isProfile
        userId={params.userId}
        handlerFilters={handlerFilters}
        profilePhoto={profilePhoto}
      />
      <View style={{flex: 1, marginTop: -250}}>
        <FlatList
          data={tasks}
          renderItem={({item}) => (
            <TextBox
              onPress={() => createOrUpdateTask(true, item.id)}
              onCompleteTask={() => completeTask(item.id)}>
              {item.title}
            </TextBox>
          )} //Call box
          keyExtractor={item => item.id}
          ListEmptyComponent={() => {
            return <EmptyMessage />; //Call empty message
          }}
          ListHeaderComponent={() => {
            return tasks.length > 0 ? (
              <Text style={{...styles.title, color: colors.backgroundButton}}>
                Mine opgaver
              </Text>
            ) : null;
          }}
        />
        <TouchableOpacity onPress={() => createOrUpdateTask(false)}>
          <Icon
            name={'plus-circle'}
            style={{
              position: 'absolute',
              color: '#67A9EF',
              top: -110,
              left: '75%',
              zIndex: 10,
            }}
            size={80}
          />
        </TouchableOpacity>
      </View>
      {open.open ? (
        <ModalForm
          visible={open.open}
          update={open.update}
          onClose={closeModal}
          theme={colors}
          owner={params.userId}
          refreshScreen={refreshScreen}
          task_id={open.task_id}
        />
      ) : null}
      {modalGuest ? (
        <GuestModal visible={modalGuest} onClose={() => {}} theme={colors} />
      ) : null}
    </View>
  );
};

export default Dashboard;
