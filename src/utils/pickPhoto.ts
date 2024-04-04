import {launchImageLibrary} from 'react-native-image-picker';

export const pickPhoto = async (limit: number) => {
  const result = await launchImageLibrary({
    mediaType: 'photo',
    selectionLimit: limit,
    quality: 1,
    includeExtra: true,
  });
  return result;
};
