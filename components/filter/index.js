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
import {useEffect, useState} from 'react';
import {useDebounce} from 'use-debounce';
import {useFilters} from '../../hooks';
import t from '../../localization';

const styles_filter = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
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
  },
});

const filter_options = [
  {
    id: 1,
    name: t.gennemførte,
    value: 1,
  },
  {
    id: 2,
    name: t.created_by,
    value: 2,
  },
  {
    id: 3,
    name: t.omtaler_mig,
    value: 3,
  },
  {
    id: 4,
    name: t.med_billeder,
    value: 4,
  },
];

const FilterModal = ({visible, onClose, theme, filterOptions}) => {
  const [options, setOptions] = useState([]);
  const addFilter = value => {
    if (options.includes(value)) {
      const removed = options.filter(op => op !== value);
      setOptions([...removed]);
    } else {
      setOptions([...options, value]);
    }
  };

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
            <TouchableOpacity onPress={() => addFilter(item.value)}>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  padding: 10,
                }}>
                <Icon
                  name={`circle${!options.includes(item.value) ? '-thin' : ''}`}
                  style={{color: '#F2994A'}}
                  size={30}
                />
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
          <Button text={t.gem} onPress={() => onClose(options)} theme={theme} />
        </View>
      </View>
    </Modal>
  );
};

const Filter = ({theme, handlerFilters,filters}) => {
  const {
    closeFilterModal,
    filterMessageDebounced,
    filterOptions,
    handlerFilterText,
    open,
    showFilterModal,
  } = useFilters();

  useEffect(() => {
    if (filterOptions.length > 0 || filterMessageDebounced != null || filters != null) {
      handlerFilters({
        message: filterMessageDebounced,
        options: filterOptions,
      });
    }
  }, [filterMessageDebounced, filterOptions]);

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View
        style={{
          position: 'absolute',
          zIndex: 1,
          left: 20,
        }}>
        <Loop />
      </View>
      <TextInput
        placeholder={t.placeholder_input}
        style={{
          ...styles.input,
          color: theme.colorInputText,
          backgroundColor: theme.backgroundInput,
          paddingLeft: 40,
          paddingBottom: 5,
          alignSelf: 'center',
          width: 336,
          height: 43,
          ...styles.placeholder_text,
        }}
        onChangeText={handlerFilterText}
        focusable={false}
      />
      <TouchableOpacity
        onPress={showFilterModal}
        style={{
          position: 'absolute',
          right: 30,
          zIndex: 1,
        }}>
        <FilterIcon>
          {filterOptions.length > 0 ? (
            <View
              style={{
                left: 10,
                top: -7,
              }}>
              <Icon name="circle" color={'#F2994A'} size={17}></Icon>
              <Text
                style={{
                  position: 'absolute',
                  color: 'white',
                  paddingLeft: 4,
                  paddingTop: 2.2,
                  fontWeight: '500',
                  fontSize: 10,
                  lineHeight: 12,
                }}>
                {filterOptions.length}
              </Text>
            </View>
          ) : null}
        </FilterIcon>
      </TouchableOpacity>
      <FilterModal
        visible={open}
        filterOptions={filterOptions}
        onClose={closeFilterModal}
        theme={theme}
      />
    </View>
  );
};

export default Filter;
