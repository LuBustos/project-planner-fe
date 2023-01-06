import {useEffect, useRef, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome.js';
import {errorMessage} from '../../../utils/snackbar';

export const TagLabel = ({name, isIcon = false, width = 'auto'}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: '#e6e6ea',
        borderRadius: 150 / 2,
        width: name.length < 5 ? 40 : width,
        marginLeft: 10,
      }}
      key={`${name}-view`}>
      {isIcon ? (
        <Icon
          name={'close'}
          style={{
            marginTop: 2,
          }}
          key={`${name}-icon`}
        />
      ) : null}
      <Text key={`${name}-text`} style={{marginLeft: 6}}>{name}</Text>
    </View>
  );
};

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
        if (!search) {
          setTags([...tags, {name: value, id: tags.length + 1}]);
        } else {
          errorMessage('This tags already exist');
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
        style={{
          ...styles.input,
          height: 52,
          paddingTop: 5,
          marginBottom: value.length > 0 ? 0 : 10,
        }}
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
                <TouchableOpacity
                  key={index + 2}
                  onPress={() => removeTags(tag.id)}>
                  <TagLabel name={tag.name} isIcon={true} key={index} />
                </TouchableOpacity>
              );
            })
          : null}
      </View>
    </View>
  );
};

export default Tags;
