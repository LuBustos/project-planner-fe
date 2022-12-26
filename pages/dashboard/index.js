import {
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../components/header';
import {useTheme} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {TextBox, customAlert} from '../../components/';
// import {textStyle} from '../../styles.js';
import {textStyle} from '../../mixin';
import EmptyMessage from '../../components/empty';
import Icon from 'react-native-vector-icons/FontAwesome.js';
import ModalForm from '../../components/form';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getTask, updateTaskStatus} from '../../services/task.service';
import Snackbar from 'react-native-snackbar';


const styles = StyleSheet.create({
  title: {
    ...textStyle('600', 18, 27),
    letterSpacing: 1,
    marginLeft: 27,
    marginBottom: 23,
    // color: '#FFFFFF',
  },
});

const COMPLETED = 2

const mock_tasks = [
  {
    id: 1,
    title: 'Task 1',
    description: 'This is my first task',
    destiny: [{}], //For people
    tags: [],
  },
  {
    id: 2,
    title: 'Task 2',
    description: 'This is my second task',
    destiny: [{}], //For people
    tags: [],
  },
  {
    id: 3,
    title: 'Task 3',
    description: 'Ops!',
    destiny: [{}], //For people
    tags: [],
  },
  {
    id: 4,
    title: 'Task 4',
    description: 'Ops 4',
    destiny: [{}], //For people
    tags: [],
  },
  {
    id: 5,
    title: 'Task 4',
    description: 'Ops 4',
    destiny: [{}], //For people
    tags: [],
  },
  {
    id: 6,
    title: 'Task 4',
    description: 'Ops 4',
    destiny: [{}], //For people
    tags: [],
  },
  {
    id: 7,
    title: 'Task 4',
    description: 'Ops 4',
    destiny: [{}], //For people
    tags: [],
  },
  {
    id: 8,
    title: 'Task 4',
    description: 'Ops 4',
    destiny: [{}], //For people
    tags: [],
  },
];

const Dashboard = props => {
  const {
    route: {params},
  } = props;
  const {colors} = useTheme();
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState({open: false, update: false,task_id: null});
  const [refresh, setRefresh] = useState(false);
  // const [filterOptions,setFilterOptions] = useState([])

  const getAllTask = async id => {
    const response = await getTask(id);
    setTasks(response.data);
  };

  useEffect(() => {
    getAllTask(params.userId);
  }, [refresh]);

  const createOrUpdateTask = (update = false,task_id) => {
    setOpen({open: true, update: update,task_id: task_id});
  };

  const closeModal = () => {
    setOpen({open: false, update: false,task_id: null});
  };

  const refreshScreen = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 250);
  };

  const completeTask = async (id) => {
    const response = await updateTaskStatus(id,COMPLETED);
    if(response.success){
      Snackbar.show({
        text: response.message,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: "#27AE60",
        textColor: 'black',
      });
      refreshScreen()
    }
  }

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
      />
      <View style={{flex: 1, marginTop: -250}}>
        <FlatList
          data={tasks}
          renderItem={({item}) => (
            <TextBox onPress={() => createOrUpdateTask(true,item.id)} onCompleteTask={() => completeTask(item.id)}>
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
    </View>
  );
};

export default Dashboard;
