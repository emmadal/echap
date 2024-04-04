import {Platform} from 'react-native';
import {request, PERMISSIONS} from 'react-native-permissions';
const {IOS, ANDROID} = PERMISSIONS;

const requestMediaPermission = async () => {
  switch (Platform.OS) {
    case 'android':
      const granted = await request(ANDROID.READ_EXTERNAL_STORAGE);
      return granted === 'granted' ? true : false;
    case 'ios':
      const isGranted = await request(IOS.CAMERA);
      return isGranted === 'granted' ? true : false;
    default:
      return false;
  }
};

export default requestMediaPermission;
