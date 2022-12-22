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
import {useState} from 'react';
import {TextBox} from '../../components/';
// import {textStyle} from '../../styles.js';
import {textStyle} from '../../mixin';
import EmptyMessage from '../../components/empty';
import Icon from 'react-native-vector-icons/FontAwesome.js';
import ModalForm from '../../components/form';
import {SafeAreaView} from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  title: {
    ...textStyle('600', 18, 27),
    letterSpacing: 1,
    marginLeft: 27,
    marginBottom: 23,
    // color: '#FFFFFF',
  },
});

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

const Dashboard = () => {
  const {colors} = useTheme();
  const [tasks, setTasks] = useState(mock_tasks);
  const [open, setOpen] = useState({open: false, update: false});

  const createOrUpdateTask = (update = false) => {
    console.log(update)
    setOpen({open: true, update: update});
  };

  const closeModal = () => {
    setOpen({open: false, update: false});
  };

  return (
    <View style={{flex: 1, height: '100%'}}>
      <Header
        header_style={{
          left: -55,
          top: -120,
        }}
        isFilter
        theme={colors}
        isProfile
      />
      <View style={{flex: 1, marginTop: -250}}>
        <FlatList
          data={tasks}
          renderItem={({item}) => (
            <TextBox onPress={() => createOrUpdateTask(true)}>
              {item.description}
            </TextBox>
          )} //Call box
          keyExtractor={item => item.id}
          ListEmptyComponent={() => {
            return <EmptyMessage />; //Call Icon empty
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
      <ModalForm
        visible={open.open}
        update={open.update}
        onClose={closeModal}
        theme={colors}
      />
    </View>
  );
};

export default Dashboard;
