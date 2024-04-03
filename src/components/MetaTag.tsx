import React, {FC} from 'react';
import moment from 'moment';
import {Text, View, StyleSheet} from 'react-native';
import colors from 'themes/colors';

type Props = {
  date: string;
  price: number;
};
const MetaTag: FC<Props> = ({date, price}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Publié {moment(date).locale('fr').fromNow()}
      </Text>
      <Text style={styles.price}>{price} FCFA</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    flexWrap: 'wrap',
  },
  text: {
    fontWeight: '500',
    fontSize: 14,
    color: colors.gray.main,
  },
  price: {
    fontWeight: '800',
    fontSize: 16,
    color: colors.primary,
  },
});

export default MetaTag;
