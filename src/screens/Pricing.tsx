import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import colors from 'themes/colors';
import PricingCard from 'components/PricingCard';
import {pricing} from 'constants/pricing';

const Pricing = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Abonnement</Text>
      <Text style={styles.desc}>
        Choisissez le bon plan pour vos besoins. Sans frais, sans contract. Vous
        pouvez annuler votre abonnement à tout moment.
      </Text>
      <FlatList
        style={styles.flatList}
        data={pricing}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ContainerStyle}
        contentInsetAdjustmentBehavior="automatic"
        renderItem={({item}) => <PricingCard item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray.light,
    padding: 30,
  },
  flatList: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  ContainerStyle: {
    flexGrow: 1,
  },
  desc: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  block: {
    alignSelf: 'center',
  },
});
export default Pricing;
