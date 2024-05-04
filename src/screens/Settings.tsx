import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import * as Keychain from 'react-native-keychain';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import colors from 'themes/colors';
import {useStore} from 'store';
import {useNavigation} from '@react-navigation/native';

const Settings = () => {
  const signOut = useStore(state => state.signOut);
  const navigation = useNavigation();
  const handleLogOut = async () => {
    await Keychain.resetGenericPassword();
    signOut();
  };
  return (
    <View style={styles.container}>
      {/* <View style={styles.blockContainer}>
        <Text style={styles.title}>Accessibilité</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.pressable}>
            <View style={styles.pressableIcon}>
              <Icon name="action-redo" size={20} />
              <Text style={styles.textPressableIcon}>Partager le profil</Text>
            </View>
            <EvilIcon name="chevron-right" size={25} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.pressable}>
            <View style={styles.pressableIcon}>
              <Icon name="feed" size={20} />
              <Text style={styles.textPressableIcon}>En direct</Text>
            </View>
            <EvilIcon name="chevron-right" size={25} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.pressable}>
            <View style={styles.pressableIcon}>
              <Icon name="flag" size={20} />
              <Text style={styles.textPressableIcon}>Langues</Text>
            </View>
            <EvilIcon name="chevron-right" size={25} />
          </TouchableOpacity>
        </View>
      </View> */}
      <View style={styles.blockContainer}>
        <Text style={styles.title}>Support</Text>
        <View style={styles.card}>
          {/* <TouchableOpacity
            style={styles.pressable}
            onPress={() => navigation.navigate('Help')}>
            <View style={styles.pressableIcon}>
              <Icon name="question" size={20} />
              <Text style={styles.textPressableIcon}>Aide</Text>
            </View>
            <EvilIcon name="chevron-right" size={25} />
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.pressable}
            onPress={() => navigation.navigate('Support')}>
            <View style={styles.pressableIcon}>
              <Icon name="earphones-alt" size={20} />
              <Text style={styles.textPressableIcon}>Support</Text>
            </View>
            <EvilIcon name="chevron-right" size={25} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.pressable}>
            <View style={styles.pressableIcon}>
              <Icon name="question" size={20} />
              <Text style={styles.textPressableIcon}>
                Termes & Confidentialité
              </Text>
            </View>
            <EvilIcon name="external-link" size={25} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.blockContainer}>
        <Text style={styles.title}>Abonnement</Text>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.pressable}
            onPress={() => navigation.navigate('Pricing')}>
            <View style={styles.pressableIcon}>
              <EvilIcon name="credit-card" size={20} />
              <Text style={styles.textPressableIcon}>Mon abonnement</Text>
            </View>
            <EvilIcon name="chevron-right" size={25} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.blockContainer}>
        <Text style={styles.title}>Connexion</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.pressable} onPress={handleLogOut}>
            <View style={styles.pressableIcon}>
              <Icon name="logout" size={20} />
              <Text style={styles.textPressableIcon}>Déconnexion</Text>
            </View>
            <EvilIcon name="chevron-right" size={25} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray.light,
    padding: 30,
  },
  title: {
    fontWeight: '600',
    fontSize: 15,
    color: colors.text,
    marginBottom: 10,
  },
  blockContainer: {
    marginVertical: 15,
  },
  card: {
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 25,
  },
  pressableIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textPressableIcon: {
    marginLeft: 10,
    fontWeight: '500',
    fontSize: 15,
  },
});

export default memo(Settings);
