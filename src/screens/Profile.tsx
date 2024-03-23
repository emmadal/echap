import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
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
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.userInfo}>
          <View style={styles.edit}>
            <Text style={styles.name}>{user.name}</Text>
            {user?.premium ? (
              <TouchableOpacity onPress={handleVisible}>
                <PremiumSvg fill="rgb(249 115 22)" height={23} width={23} />
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity
              style={styles.editIcon}
              onPress={handleEditProfile}>
              <Icon name="edit" size={23} color={colors.text} />
            </TouchableOpacity>
          </View>
          <Text style={styles.phone}>{user.phone}</Text>
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: colors.white,
    paddingHorizontal: 5,
    elevation: 7,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  phone: {
    fontSize: 16,
    color: colors.gray.main,
    fontWeight: '700',
    marginTop: 7,
    marginBottom: 13,
  },
  name: {
    fontSize: 20,
    color: colors.text,
    fontWeight: '700',
  },
  bio: {
    textAlign: 'justify',
    fontSize: 13,
    color: colors.text,
    width: Dimensions.get('screen').width / 1.5,
    marginBottom: 15,
  },
  userInfo: {
    alignSelf: 'center',
    marginTop: 15,
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
