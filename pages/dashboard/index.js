import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
import t from '../../localization';
import {useDashboard} from '../../hooks';
import {onDisplayNotification} from '../../utils/notify';
import ReminderModal from '../../components/modal/reminder';
import {getData} from '../../utils/storage';
import CompleteAllTaskMessage from '../../components/complete';

const styles = StyleSheet.create({
  title: {
    ...textStyle('600', 18, 27),
    letterSpacing: 1,
    marginLeft: 5,
    marginBottom: 13,
  },
});

const COMPLETED = 2;

const ListEmptyComponent = ({user}) => {
  if (!user) {
    return <EmptyMessage />;
  }

  if (user.isFirstTime) {
    return <EmptyMessage />;
  }

  return <CompleteAllTaskMessage />;
};

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
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!params.userId) {
      openModalGuest();
    }
  }, []);

  useEffect(() => {
    if (params.userId) {
      getProfile(params.userId);
    }
  }, [uri]);

  useEffect(() => {
    if (params.userId) {
      Promise.all(
        getAllTask(params.userId, filterOptions),
        getProfile(params.userId),
      );
      getDataFromStorage();
    }
  }, [refresh, filterOptions]);

  const getDataFromStorage = async () => {
    const data = await getData();
    if (data) {
      setUser(data);
    }
  };

  const getAllTask = async id => {
    try {
      const response = await getTask(id, filterOptions);
      saveTasks(response.data);
      if (response.overdueTask > 0) {
        await onDisplayNotification(
          t.overdue_tasks,
          `${t.you_have} ${response.overdueTask} ${t.overdue_to_complete}`,
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
          top: Platform.OS === 'ios' ? -120 : -150,
        }}
        height={Platform.OS === 'ios' ? "65%" : "70%"}
        isFilter
        theme={colors}
        isProfile
        userId={params.userId}
        handlerFilters={handlerFilters}
        profilePhoto={profilePhoto}
        refreshScreen={refreshScreen}
        filters={filterOptions}
      />
      <View style={{flex: 1, marginTop: -250, alignSelf: 'center'}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : 20}
          enabled={true}
          style={{flex: 1}}>
          <FlatList
            testID="flatlist_test"
            data={tasks}
            renderItem={({item}) => (
              <TextBox
                onPress={() => openCreateOrUpdateTask(true, item.id)}
                onCompleteTask={() => completeTask(item.id)}
                overdue={item.overdue}
                status={item.status_id}
                onReminderTask={() => handlerOpenReminderModal(item)}>
                {item.title}
              </TextBox>
            )} //Call box
            keyExtractor={item => item.id}
            ListEmptyComponent={() => <ListEmptyComponent user={user} />}
            ListHeaderComponent={() => {
              return tasks.length > 0 ? (
                <Text style={{...styles.title, color: colors.backgroundButton}}>
                  {t.mine_opgaver}
                </Text>
              ) : null;
            }}
          />
        </KeyboardAvoidingView>
        <TouchableOpacity
          onPress={() => openCreateOrUpdateTask(false)}
          testID="add_icon_test">
          <Icon
            name={'plus-circle'}
            style={{
              position: 'absolute',
              color: colors.iconColor,
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
