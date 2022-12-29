import {Image, TouchableOpacity, View} from 'react-native';
import User from '../../assets/user';

const Profile = ({onPress, profilePhoto, width = 51, height = 51}) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        {!profilePhoto ? (
          <User
            style={{
              width: width,
              height: height,
            }}
          />
        ) : (
          <Image
            source={{uri: profilePhoto}}
            style={{
              width: width,
              height: height,
              borderRadius: 150 / 2,
            }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
