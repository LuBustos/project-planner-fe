import { Text, TextInput, View } from "react-native";
const styles = require('../../styles');



const Input = ({label,theme,label_styles,...props}) => {
  return (
    <View>
      <Text style={label_styles}>{label}</Text>
      <TextInput
        style={{
          ...styles.input,
          color: theme.colorInputText,
          backgroundColor: theme.backgroundInput,
          padding: 12
        }}
        {...props}
      />
    </View>
  );
};

export default Input;
