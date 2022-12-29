import {useEffect} from 'react';
import {Text, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const SelectForm = ({
  value,
  label,
  onChange,
  name,
  users,
  setUsers,
  owner,
  setUserValue,
  userValue,
  open,
  setOpen,
  styles
}) => {
  useEffect(() => {
    onChange(name, userValue);
  }, [userValue]);

  return (
    <>
      {value.length > 0 ? <Text style={styles.label}>{label}</Text> : null}
      <DropDownPicker
        open={open}
        value={userValue}
        items={users}
        setOpen={setOpen}
        style={{...styles.input, height: 52}}
        setValue={setUserValue}
        setItems={setUsers}
        multiple={true}
        mode={'BADGE'}
        autoScroll={true}
        renderBadgeItem={props => {
          const {IconComponent, label, value} = props;
          return (
            <View style={styles.item} {...props}>
              <IconComponent />
              <Text>{owner !== value ? label : '(Mig)'}</Text>
            </View>
          );
        }}
        dropDownDirection="TOP"
        dropDownContainerStyle={{
          ...styles.input,
        }}
      />
    </>
  );
};

export default SelectForm;
