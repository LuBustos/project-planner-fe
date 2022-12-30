import {Image, TouchableOpacity, View} from 'react-native';
import User from '../../assets/user';
import { useState } from 'react';

const Profile = ({onPress, profilePhoto, width = 51, height = 51}) => {

  const [profile,setProfile] = useState(profilePhoto);

  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        {!profile ? (
          <User
            style={{
              width: width,
              height: height,
            }}
          />
        ) : (
          <Image
            source={{uri: profile}}
            style={{
              width: width,
              height: height,
              borderRadius: 150 / 2,
            }}
            onError={() => setProfile(null)}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
