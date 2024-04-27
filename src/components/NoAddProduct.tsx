import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import colors from 'themes/colors';
import Button from './Button';

export const NoAddProduct = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.desc}>
        Pour ajouter un produit, veuillez souscrire à l'offre premium
      </Text>
      <Button
        title="Souscrice ici"
        onPress={() => navigation.navigate('Pricing')}
        style={styles.btn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray.light,
    padding: 20,
  },
  desc: {
    fontSize: 18,
    marginTop: 50,
    color: colors.text,
    lineHeight: 30,
  },
  btn: {
    width: Dimensions.get('window').width / 2,
    marginTop: 30,
  },
});
