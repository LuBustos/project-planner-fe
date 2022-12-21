import {TouchableOpacity, View} from 'react-native';
import User from '../../assets/user';

const Profile = ({onPress}) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <User style={{
            position: 'absolute',
            width:51,
            height:51,
            top: -420,
            bottom: 0,
            left: 320,
            right: 0
        }}/>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
