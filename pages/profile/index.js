import {Image, Text, TouchableOpacity, View} from 'react-native';
import Header from '../../components/header';
import {Button} from '../../components';
import styles from '../../styles.js';
import {useTheme} from '@react-navigation/native';
import {useState} from 'react';
import User from '../../assets/user';
import Gallery from '../../assets/gallery';
import Camera from '../../assets/camera';

import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

const CreateProfile = props => {
  const {
    navigation,
    route: {params},
  } = props;
  const {colors} = useTheme();
  const [profilePhoto, setProfilePhoto] = useState(null);

  const goToDashboard = () => {
    navigation.navigate('Dashboard',{
      userId: params.userId
    });
  };

  const openGallery = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      });

      const {uri, fileName} = result.assets[0];

      console.log(result.assets[0]);

      setProfilePhoto({
        fileName: fileName,
        fileUri: uri,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const openCamera = async () => {
    try {
      const result = await launchCamera({
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      });

      console.log(result);

      // const {uri,fileName,} = result.assets[0]

      // console.log(result.assets[0]);

      // setProfilePhoto({
      //   fileName: fileName,
      //   fileUri: uri,
      // });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Header
        header_style={{
          left: -55,
          top: -120,
        }}
        height="45%"
        title={'Profilbillede'}
        title_style={{...styles.second_title, color: colors.text}}
      />
      <View>
        {!profilePhoto ? (
          <User
            style={{
              alignSelf: 'center',
              width: 150,
              height: 150,
            }}
          />
        ) : (
          <Image
            source={{uri: profilePhoto.fileUri}}
            style={{
              width: 150,
              height: 150,
              borderRadius: 150 / 2,
              alignSelf: 'center',
            }}
          />
        )}
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          margin: 20,
        }}>
        <TouchableOpacity onPress={openCamera}>
          <Camera
            style={{
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              ...styles.icon_text,
            }}>
            Kamera
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openGallery}>
          <Gallery
            style={{
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              ...styles.icon_text,
            }}>
            Upload
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{alignItems: 'center', marginTop: 20}}>
        <Button onPress={goToDashboard} text={'Vælg'} theme={colors} />
      </View>
    </View>
  );
};

export default CreateProfile;
