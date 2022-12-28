import { useState } from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

function useImages() {
  const [imageGallery, setImageGallery] = useState(null);
  const [imageCamera, setImageCamera] = useState(null);

  const openGallery = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      });

      handleImageGallery(result.assets[0]);
      
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

      if (result) {
        const {uri, fileName} = result.assets[0];

        console.log(result.assets[0]);

        setImageCamera({
          fileName: fileName,
          fileUri: uri,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageGallery = (image) => {
    const {uri, fileName = '',type = "image/jpg"} = image;

    setImageGallery({
      fileName: fileName,
      fileUri: uri,
      type: type
    });
  }

  return {openCamera,openGallery,imageCamera,imageGallery,handleImageGallery}
}

export default useImages;
