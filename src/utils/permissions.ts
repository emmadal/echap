import {Platform} from 'react-native';
import {check, PERMISSIONS, request} from 'react-native-permissions';

// request a user permission to have access in photos library
export const requestMediaPermission = async () => {
  const {IOS, ANDROID} = PERMISSIONS;
  const {OS} = Platform;
  // request permissions to read picture on device
  if (OS === 'ios') {
    await request(IOS.CAMERA);
  }
  if (OS === 'android') {
    await request(ANDROID.READ_EXTERNAL_STORAGE, {
      title: 'Oblack',
      message: 'Autoriser à accéder à votre librairie photo ?',
      buttonNegative: 'Annuler',
      buttonPositive: 'Accepter',
    });
  }
  // Check the permission if it granted (allowed)
  const status = OS === 'ios' ? IOS.CAMERA : ANDROID.READ_EXTERNAL_STORAGE;
  const permission = await check(status);
  return permission;
};
