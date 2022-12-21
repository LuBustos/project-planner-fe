import {Image, Text, TouchableOpacity, View} from 'react-native';
import Header from '../../components/header';
import {Button} from '../../components';
import styles from '../../styles.js';
import {useTheme} from '@react-navigation/native';
import {useState} from 'react';
import User from '../../assets/user';
import Gallery from '../../assets/gallery';
import Camera from '../../assets/camera';

const CreateProfile = props => {
  const {navigation} = props;
  const {colors} = useTheme();
  const [profilePhoto, setProfilePhoto] = useState(null);

  const goToDashboard = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <View>
      <Header
        header_style={{
          left: -55,
          top: -100,
        }}
        title={'Profilbillede'}
        title_style={{...styles.second_title, color: colors.text}}
      />
      <View>
        <User
          style={{
            left: 0,
            top: -80,
            alignSelf: 'center',
          }}
        />
        {/* <Image source={{uri: '../../assets/user.js'}} style={{
            width: "100%",
            height: 200,
            resizeMode: 'contain'
        }} /> */}
      </View>
      <View>
        <TouchableOpacity>
          <Camera
            style={{
              left: 134,
              top: -70,
            }}
          />
          <Text
            style={{
              left: 124,
              top: -70,
              ...styles.icon_text,
            }}>
            Kamera
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Gallery
            style={{
              left: 227,
              top: -114,
            }}
          />
          <Text
            style={{
              left: 216,
              top: -115,
              ...styles.icon_text,
            }}>
            Upload
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{alignItems: 'center', marginTop: -70}}>
        <Button onPress={goToDashboard} text={'Vælg'} theme={colors} />
      </View>
    </View>
  );
};

export default CreateProfile;
