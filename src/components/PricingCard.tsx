import React from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import colors from 'themes/colors';
import {Plan} from 'types/plan';
import Button from './Button';
import Icon from 'react-native-vector-icons/AntDesign';

const PricingCard = ({item}: {item: Plan}) => {
  return (
    <Animated.View style={styles.card}>
      <Icon name="star" color={colors.primary} size={17} style={styles.icon} />
      <Text style={styles.title}>{item.plan}</Text>
      <Text style={styles.price}>{item.price}</Text>
      <Text style={styles.desc}>Fonctionnalités suivantes :</Text>
      {item?.features.map(feat => (
        <View style={styles.feature} key={feat?.id}>
          <Icon
            name={feat?.icon ? 'checkcircle' : 'closecircle'}
            color={feat?.icon ? colors.primary : colors.error}
            size={16}
          />
          <Text style={styles.textFeature}>{feat.feature}</Text>
        </View>
      ))}
      <Button title="Choisir l'offre" />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    borderWidth: 0.3,
    marginVertical: 20,
    backgroundColor: colors.white,
    borderColor: colors.white,
    padding: 15,
    fontSize: 18,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    elevation: 20,
    shadowOpacity: 0.58,
    shadowRadius: 5.0,
  },
  title: {
    fontSize: 18,
    color: colors.text,
    fontWeight: '500',
    textAlign: 'center',
  },
  price: {
    fontSize: 24,
    color: colors.text,
    fontWeight: '800',
    textAlign: 'center',
    marginVertical: 10,
  },
  desc: {
    color: colors.text,
    marginVertical: 15,
    marginLeft: 5,
    fontSize: 17,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  textFeature: {
    color: colors.text,
    fontSize: 18,
    paddingLeft: 6,
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 10,
  },
});

export default PricingCard;
