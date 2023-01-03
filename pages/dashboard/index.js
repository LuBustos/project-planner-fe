import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Header from '../../components/header';
import {useTheme} from '@react-navigation/native';
import {useEffect} from 'react';
import {TextBox} from '../../components/';
import {textStyle} from '../../mixin';
import EmptyMessage from '../../components/empty';
import Icon from 'react-native-vector-icons/FontAwesome.js';
import ModalForm from '../../components/form';
import {getTask, updateTaskStatus} from '../../services/task.service';
import {errorMessage, successMessage} from '../../utils/snackbar';
import {getUserById} from '../../services/user.service';
import GuestModal from '../../components/modal/guest';
import t from '../../localization';
import {useDashboard} from '../../hooks';
import {onDisplayNotification} from '../../utils/notify';
import ReminderModal from '../../components/modal/reminder';

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
  const {uri = null} = params;
  const {colors} = useTheme();
  const {
    closeModal,
    filterOptions,
    handlerFilters,
    handlerProfilePhoto,
    modalGuest,
    open,
    openCreateOrUpdateTask,
    openModalGuest,
    profilePhoto,
    refresh,
    refreshScreen,
    saveTasks,
    tasks,
    handlerOpenReminderModal,
    closeReminderModal,
    openReminderModal,
  } = useDashboard();

  useEffect(() => {
    if (!params.userId) {
      openModalGuest();
    }
  }, []);

  useEffect(() => {
    getProfile(params.userId);
  }, [uri]);

  useEffect(() => {
    if (params.userId) {
      Promise.all(
        getAllTask(params.userId, filterOptions),
        getProfile(params.userId),
      );
    }
  }, [refresh, filterOptions]);

  const getAllTask = async id => {
    try {
      console.log('HOLA?');
      const response = await getTask(id, filterOptions); //we should transform this in a post!
      saveTasks(response.data);
      if (response.overdateTasks > 0) {
        console.log('test');
        ///Add translations
        await onDisplayNotification(
          'You have overdate tasks',
          `you have ${response.overdateTasks} overdate tasks to complete`,
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProfile = async id => {
    const response = await getUserById(id);
    handlerProfilePhoto(response.data.avatar);
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
        refreshScreen={refreshScreen}
        filters={filterOptions}
      />
      <View style={{flex: 1, marginTop: -250}}>
        <FlatList
          testID="flatlist_test"
          data={tasks}
          renderItem={({item}) => (
            <TextBox
              onPress={() => openCreateOrUpdateTask(true, item.id)}
              onCompleteTask={() => completeTask(item.id)}
              overdate={item.overdate}
              onReminderTask={() => handlerOpenReminderModal(item)}>
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
                {t.mine_opgaver}
              </Text>
            ) : null;
          }}
        />
        <TouchableOpacity
          onPress={() => openCreateOrUpdateTask(false)}
          testID="add_icon_test">
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
      {openReminderModal.open ? (
        <ReminderModal
          visible={openReminderModal.open}
          onClose={closeReminderModal}
          theme={colors}
          fields={openReminderModal.fields}
        />
      ) : null}
    </View>
  );
};

export default Dashboard;
