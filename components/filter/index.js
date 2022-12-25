import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../../styles';
import {textStyle} from '../../mixin';
import FilterIcon from '../../assets/filter';
import Loop from '../../assets/loop';
import Button from '../button';
import Icon from 'react-native-vector-icons/FontAwesome.js';
import {useState} from 'react';

const styles_filter = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
    // height: '100%',
    width: 351,
    height: 441,
    padding: 20,
    marginTop: 160,
    marginLeft: 20,
  },
  title: {
    ...textStyle('600', 20, 30),
    letterSpacing: 1.5,
    textAlign: 'left',
    color: '#F2994A',
    marginBottom: 38,
  },
  filterOptions: {
    ...textStyle('400', 20, 30),
    textAlign: 'left',
    marginLeft: 10,
    // color: "#4F4F4F",
  },
});

const filter_options = [
  {
    id: 1,
    name: 'Gennemførte',
  },
  {
    id: 2,
    name: 'Oprettet af mig',
  },
  {
    id: 3,
    name: 'Omtaler mig',
  },
  {
    id: 4,
    name: 'Omtaler mig',
  },
];

const FilterModal = ({visible, onClose, theme}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles_filter.container}>
        <Text style={styles_filter.title}>Filtre</Text>
        <FlatList
          data={filter_options}
          renderItem={({item}) => (
            <TouchableOpacity>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  padding: 10,
                }}>
                <Icon name="circle-thin" style={{color: '#F2994A'}} size={30} />
                <Text style={styles_filter.filterOptions}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Button text={'Gem'} onPress={onClose} theme={theme} />
        </View>
      </View>
    </Modal>
  );
};

const Filter = ({theme}) => {
  const [open, setOpen] = useState(false);

  const showFilterModal = () => {
    setOpen(true);
  };

  const closeFilterModal = () => {
    setOpen(false);
  };

  return (
    <View>
      <TextInput
        placeholder="Søg efter opgaver"
        style={{
          ...styles.input,
          color: theme.colorInputText,
          backgroundColor: theme.backgroundInput,
          paddingLeft: 40,
          paddingBottom: 5,
          top: -360,
          alignSelf: 'center',
          width: 336,
          height: 43,
          ...styles.placeholder_text,
        }}
        focusable={false}
      />
      <Loop
        style={{
          left: '10%',
          top: -402,
        }}
      />
      <TouchableOpacity onPress={showFilterModal}>
        <View>
          <FilterIcon
            style={{
              left: '82%',
              top: -422,
            }}
          />
        </View>
      </TouchableOpacity>
      <FilterModal visible={open} onClose={closeFilterModal} theme={theme} />
    </View>
  );
};

export default Filter;
