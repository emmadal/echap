import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import TopBar from 'routes/TopBar';
import {useStore} from 'store';
import colors from 'themes/colors';
import PremiumSvg from 'components/PremiumSvg';
import Snackbar from 'components/Snackbar';

const Profile = () => {
  const navigation = useNavigation();
  const user = useStore(state => state.user);
  const [visible, setVisible] = React.useState(false);

  const handleEditProfile = () => navigation.navigate('EditProfile');

  const handleVisible = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  return (
    <Animated.View style={styles.container}>
      <View style={styles.userInfo}>
        <View style={styles.edit}>
          <Text style={styles.name}>{user.name}</Text>
          {user?.premium ? (
            <TouchableOpacity onPress={handleVisible}>
              <PremiumSvg fill="rgb(249 115 22)" height={23} width={23} />
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity style={styles.editIcon} onPress={handleEditProfile}>
            <Icon name="edit" size={23} color={colors.text} />
          </TouchableOpacity>
        </View>
        {user.biography ? (
          <Text style={styles.bio}>{user.biography}</Text>
        ) : null}
      </View>
      <TopBar />
      <Snackbar
        visible={visible}
        duration={2000}
        onDissmiss={onDismissSnackBar}>
        You're already a premium user
      </Snackbar>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: colors.white,
    elevation: 7,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  name: {
    fontSize: 20,
    color: colors.text,
    fontWeight: '700',
  },
  bio: {
    fontSize: 15,
    color: colors.text,
    width: Dimensions.get('screen').width / 1.5,
    marginVertical: 17,
    textAlign: 'center',
  },
  userInfo: {
    alignSelf: 'center',
    marginTop: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },
  edit: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  editIcon: {
    marginLeft: 10,
  },
});

export default Profile;
