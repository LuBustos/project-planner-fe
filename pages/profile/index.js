import {Image, Platform, Text, TouchableOpacity, View} from 'react-native';
import Header from '../../components/header';
import {Button} from '../../components';
import styles from '../../styles.js';
import {useTheme} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import User from '../../assets/user';
import Gallery from '../../assets/gallery';
import Camera from '../../assets/camera';
import {useImages} from '../../hooks';
import {getUserById, updateUser} from '../../services/user.service';

const CreateProfile = props => {
  const {
    navigation,
    route: {params},
  } = props;
  const {colors} = useTheme();
  const {imageCamera, imageGallery, openCamera, openGallery,handleImageGallery} = useImages();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const response = await getUserById(params.userId);
      handleImageGallery({uri: response.data.avatar})
    } catch (error) {
      console.error(error);
    }
  };

  const goToDashboard = () => {
    navigation.navigate('Dashboard', {
      userId: params.userId,
    });
  };

  const createFormData = photo => {
    const data = {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === 'ios'
          ? photo.fileUri.replace('file://', '')
          : photo.fileUri,
    };

    return data;
  };

  const submit = async () => {
    const data = createFormData(imageGallery);
    const response = await updateUser(params.userId, data);
    if(response){
      goToDashboard();
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
        {!imageGallery ? (
          <User
            style={{
              alignSelf: 'center',
              width: 150,
              height: 150,
            }}
          />
        ) : (
          <Image
            source={{uri: `${imageGallery.fileUri}`}}
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
        <Button onPress={submit} text={'Vælg'} theme={colors} />
      </View>
    </View>
  );
};

export default CreateProfile;
