import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Button from 'components/Button';
import {useStore} from 'store';
import colors from 'themes/colors';

const Message = () => {
  const user = useStore(state => state.user);
  const navigation = useNavigation();
  return !user?.premium ? (
    <View style={styles.container}>
      <Icon name="block" size={40} color={colors.text} style={styles.block} />
      <Text style={styles.desc}>
        Pour bénéficier de cette fonctionnalité, Veuillez souscrire a l'offre
        premium
      </Text>
      <Button
        title="Souscrire"
        onPress={() => navigation.navigate('Pricing')}
      />
    </View>
  ) : (
    <View style={styles.container}>
      <Text>Message</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray.light,
    padding: 30,
  },
  desc: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  block: {
    alignSelf: 'center',
  },
  ContainerStyle: {
    flexGrow: 1,
  },
});
export default Message;
