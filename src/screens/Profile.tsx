import {useNavigation} from '@react-navigation/native';
import React from 'react';
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
import colors from 'themes/colors';

const Profile = () => {
  const navigation = useNavigation();
  const handleEditProfile = () => navigation.navigate('EditProfile');
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.contentContainerStyle}>
        <View
          style={styles.userInfo}
          onLayout={e => console.log('e', e.nativeEvent.layout)}>
          <View style={styles.edit}>
            <Text style={styles.name}>John Doe</Text>
            <TouchableOpacity
              style={styles.editIcon}
              onPress={handleEditProfile}>
              <Icon name="edit" size={23} color={colors.text} />
            </TouchableOpacity>
          </View>
          <Text style={styles.bio}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis ex
            felis. Etiam semper dui est, nec mollis nisi aliquet in. Phasellus
            condimentum leo sed cursus fermentum.
          </Text>
        </View>
        <TopBar />
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
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  name: {
    fontSize: 20,
    color: colors.text,
    fontWeight: '700',
  },
  phone: {
    fontSize: 16,
    color: colors.gray.main,
    fontWeight: '500',
    marginTop: 3,
  },
  bio: {
    textAlign: 'justify',
    fontSize: 13,
    color: colors.text,
    width: Dimensions.get('screen').width / 1.5,
    marginTop: 10,
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
