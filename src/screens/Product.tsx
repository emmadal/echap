import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  useWindowDimensions,
} from 'react-native';
import colors from 'themes/colors';
import Slide from 'components/Slide';
import Divider from 'components/Divider';
import ContactButton from 'components/ContactButton';
import ChatButton from 'components/ChatButton';
import {useStore} from 'store';
import MetaTag from 'components/MetaTag';
import RenderHtml from 'react-native-render-html';
import DeleteArticleButton from 'components/DeleteArticle';

const tagsStyles = {
  body: {
    whiteSpace: 'normal',
    color: colors.text,
    fontSize: 17,
    lineHeight: 24,
    marginTop: 15,
    textAlign: 'justify',
  },
};
const renderersProps = {
  img: {
    enableExperimentalPercentWidth: true,
  },
};

const Product = ({route}: any) => {
  const premium = useStore(state => state.user.premium);
  const user = useStore(state => state.user);
  const {width} = useWindowDimensions();
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
          price={route?.params?.price}
          date={route?.params?.created_at}
        />
        <RenderHtml
          contentWidth={width}
          source={{
            html: `${route?.params?.description}`,
          }}
          renderersProps={renderersProps}
          tagsStyles={tagsStyles}
          ignoredDomTags={['font', 'textDecoration']}
        />
      </View>
      <Divider />
      {user?.id !== route?.params?.author_id ? (
        <View style={styles.button}>
          <ContactButton phone={route?.params?.phone} />
          <ChatButton
            title={route?.params?.title}
            image={route?.params.image}
            premium={premium}
          />
        </View>
      ) : null}
      {user?.id === route?.params?.author_id ? (
        <View style={styles.delete}>
          <DeleteArticleButton articleId={route?.params?.id} />
        </View>
      ) : null}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.gray.light,
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
  delete: {
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default Product;
