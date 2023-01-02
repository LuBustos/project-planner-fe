import {useEffect, useRef, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome.js';
import {errorMessage} from '../../../utils/snackbar';

const Tags = ({label, value, styles, onChange, name}) => {
  const [tags, setTags] = useState([]);
  const pressedEnter = useRef(false);
  const [inputValue, setInputValue] = useState(null);

  useEffect(() => {
    if (value.length > 0) {
      const savedTags = value.split(',').map((tag, index) => {
        return {
          name: tag,
          id: index,
        };
      });
      setTags(savedTags);
    }
  }, [value]);

  useEffect(() => {
    const tagsToSave = tags.map(x => x.name).join(',');
    onChange(name, tagsToSave);
  }, [tags]);

  const onEnterPress = e => {
    if (e.nativeEvent.key === ' ') {
      pressedEnter.current = true;
    } else {
      pressedEnter.current = false;
    }
  };

  const addTags = value => {
    if (pressedEnter.current === true) {
      setInputValue('');
      pressedEnter.current = false;
      if (tags.length < 3) {
        const search = tags.filter(x => x.name === value)[0];
        if (!search){
            setTags([...tags, {name: value, id: tags.length + 1}]);
        }else{
            errorMessage('This tags already exist')
        }
        
      } else {
        errorMessage('Too much tags');
      }
    } else {
      setInputValue(value);
    }
  };

  const removeTags = id => {
    const tagsFiltered = tags.filter(x => x.id !== id);
    setTags(tagsFiltered);
  };

  return (
    <View>
      {value.length > 0 ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        onChangeText={text => addTags(text)}
        style={{...styles.input, height: 52,marginTop: value.length > 0 ? 5 : 10}}
        placeholder={label}
        value={inputValue}
        onKeyPress={onEnterPress}
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          margin: 5,
        }}>
        {tags.length > 0
          ? tags.map((tag, index) => {
              return (
                <>
                  <TouchableOpacity
                    key={index + 2}
                    onPress={() => removeTags(tag.id)}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        backgroundColor: '#e6e6ea',
                        borderRadius: 150 / 2,
                        width: tag.name.length < 5 ? 40 : 'auto',
                        marginLeft: 10,
                      }}
                      key={index}>
                      <Icon
                        name={'close'}
                        key={index + 3}
                        style={{
                          marginTop: 2,
                        }}
                      />
                      <Text key={index + 1}>{tag.name}</Text>
                    </View>
                  </TouchableOpacity>
                </>
              );
            })
          : null}
      </View>
    </View>
  );
};

export default Tags;
