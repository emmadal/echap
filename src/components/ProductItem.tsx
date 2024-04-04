import React, {memo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Text,
  Image,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {IPost} from 'types/post';
import colors from 'themes/colors';

const ProductItem = ({item}: {item: IPost}) => {
  const [loading, setLoading] = useState(false);
  const navigation: any = useNavigation();
  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        navigation.navigate('Product', {
          ...item,
        })
      }>
      <Image
        source={{uri: item.banner}}
        style={styles.image}
        resizeMode="cover"
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
      <ActivityIndicator
        style={styles.activityIndicator}
        color={colors.primary}
        animating={loading}
      />
      <Text style={styles.title}>{item.title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
    justifyContent: 'center',
    height: 250,
    maxHeight: 300,
    borderRadius: 5,
  },
  card: {
    backgroundColor: 'rgb(229 231 235)',
    flex: 1,
    margin: 10,
    maxHeight: 250,
    borderRadius: 5,
    maxWidth: '50%',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4a4a4a',
    marginTop: 3,
  },
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

export default memo(ProductItem);
