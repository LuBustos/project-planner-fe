import {Image, TouchableOpacity, View} from 'react-native';
import User from '../../assets/user';

const Profile = ({onPress, profilePhoto}) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        {!profilePhoto ? (
          <User
            style={{
              width: 51,
              height: 51,
            }}
          />
        ) : (
          <Image
            source={{uri: profilePhoto}}
            style={{
              width: 51,
              height: 51,
              borderRadius: 150 / 2,
              // alignSelf: 'center',
            }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
