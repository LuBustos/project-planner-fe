import {Image, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Header from '../../components/header';
import {Button} from '../../components';
import styles from '../../styles.js';
import {useTheme} from '@react-navigation/native';
import {useEffect} from 'react';
import User from '../../assets/user';
import Gallery from '../../assets/gallery';
import Camera from '../../assets/camera';
import {useImages} from '../../hooks';
import {getUserById, updateAvatar} from '../../services/user.service';
import t from '../../localization';
import { textStyle } from '../../mixin';


const profileStyles = StyleSheet.create({
  icon_text: {
    ...textStyle('400', 14, 21),
    letterSpacing: 1,
    color: '#67A9EF',
  },
});

const CreateProfile = props => {
  const {
    navigation,
    route: {params},
  } = props;
  const {colors} = useTheme();
  const {
    imageCamera,
    imageGallery,
    openCamera,
    openGallery,
    handleImageGallery,
  } = useImages();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const response = await getUserById(params.userId);
      if (response.data.avatar) {
        handleImageGallery({uri: response.data.avatar});
      }
    } catch (error) {
      console.error(error);
    }
  };

  const goToDashboard = uri => {
    navigation.navigate('Dashboard', {
      userId: params.userId,
      uri: uri,
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
    if (imageGallery && imageGallery?.fileUri) {
      const data = createFormData(imageGallery);
      const response = await updateAvatar(params.userId, data);
      if (response) {
        goToDashboard(imageGallery.fileUri);
      }
    } else {
      goToDashboard(null);
    }
  };

  const goToTheme = () => {
    navigation.navigate('Theme', {
      userId: params.userId,
    });
  };

  return (
    <View style={{flex: 1, height: '100%'}}>
      <Header
        header_style={{
          left: -55,
          top: -150,
        }}
        height="35%"
        title={t.profilbillede}
        title_style={{...styles.second_title, color: colors.text}}
      />
      <View>
        {!imageGallery?.fileUri ? (
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
            onError={() => handleImageGallery({fileUri: null})}
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
              ...profileStyles.icon_text,
              color: colors.textImage,
            }}>
            {t.kamera}
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
              ...profileStyles.icon_text,
              color: colors.textImage,
            }}>
            {t.upload}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{alignItems: 'center', marginTop: 20}}>
        <Button
          onPress={submit}
          text={params.isCreateAccount ? t.vælg : t.gem}
          theme={colors}
        />
        <Button onPress={goToTheme} theme={colors} text={t.change_theme} />
      </View>
    </View>
  );
};

export default CreateProfile;
