import React from 'react';
import {StyleSheet, Text, ScrollView, View} from 'react-native';
import colors from 'themes/colors';
import Slide from 'components/silde';
import Divider from 'components/divider';
import ContactButton from 'components/contact-button';

const Product = ({route}: any) => {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.contentContainerStyle}>
      <Slide photos={route?.params?.photos} />
      <View style={styles.info}>
        <Text style={styles.title}>{route?.params?.title}</Text>
        <Text style={styles.description}>{route?.params?.description}</Text>
      </View>
      <Divider />
      <ContactButton phone={route?.params?.phone} />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 85,
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  description: {
    color: colors.text,
    fontSize: 17,
    lineHeight: 24,
    marginTop: 15,
    textAlign: 'justify',
  },
  info: {
    marginVertical: 20,
  },
});

export default Product;
