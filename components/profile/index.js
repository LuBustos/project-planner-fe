import {TouchableOpacity, View} from 'react-native';
import User from '../../assets/user';

const Profile = ({onPress}) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <User
          style={{
            width: 51,
            height: 51,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
