import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from '../../styles';
import FilterIcon from '../../assets/filter';
import Loop from '../../assets/loop';

const Filter = ({theme}) => {
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
      />
      <Loop
        style={{
          left: '10%',
          top: -402,
        }}
      />
      <TouchableOpacity>
        <FilterIcon
          style={{
            left: '82%',
            top: -422,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Filter;
