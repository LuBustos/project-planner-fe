import {
  FlatList,
  Modal,
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
];

const Dashboard = () => {
  const {colors} = useTheme();
  const [tasks, setTasks] = useState([]);
  return (
    <View>
      <Header
        header_style={{
          left: -55,
          top: -120,
        }}
        isFilter
        theme={colors}
        isProfile
      />
      <View style={{marginTop: -250}}>
        <FlatList
          data={tasks}
          renderItem={({item}) => <TextBox>{item.description}</TextBox>} //Call box
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
        <TouchableOpacity>
          <Icon
            name={'plus-circle'}
            style={{
              color: '#67A9EF',
              top: 10,
              left: '75%',
            }}
            size={80}
          />
        </TouchableOpacity>
        {/* <Modal animationType="slide" visible={true}>
            <View>
                <Text>Holi</Text>
            </View>
        </Modal> */}
      </View>
    </View>
  );
};

export default Dashboard;
