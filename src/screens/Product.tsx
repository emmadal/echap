import React from 'react';
import {StyleSheet, Text, ScrollView, View} from 'react-native';
import colors from 'themes/colors';
import Slide from 'components/silde';
import Divider from 'components/divider';
import ContactButton from 'components/contact-button';
import WhatsappButton from 'components/whatsapp-button';
import ChatButton from 'components/chat-button';
import {useStore} from 'store';
import MetaTag from 'components/meta-tag';

const Product = ({route}: any) => {
  const premium = useStore(state => state.user.premium);
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.contentContainerStyle}>
      <Slide photos={route?.params?.photos} />
      <View style={styles.info}>
        <Text style={styles.title}>{route?.params?.title}</Text>
        <MetaTag
          author={route?.params?.author}
          date={route?.params?.createdAt}
        />
        <Text style={styles.description}>{route?.params?.description}</Text>
      </View>
      <Divider />
      <View style={styles.button}>
        <ContactButton phone={route?.params?.phone} />
        <WhatsappButton
          icon="logo-whatsapp"
          phone={route?.params?.phone}
          title={route?.params?.title}
          image={route?.params.image}
          premium={premium}
        />
        <ChatButton
          title={route?.params?.title}
          image={route?.params.image}
          premium={premium}
        />
      </View>
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
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-around',
  },
});

export default Product;
