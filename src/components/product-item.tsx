import React, {memo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, Image, Pressable, StyleSheet} from 'react-native';
import {IPost} from 'types/post';

const ProductItem = ({item}: {item: IPost}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        navigation.navigate('Product', {
          ...item,
        })
      }>
      <Image source={{uri: item.banner}} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
    justifyContent: 'center',
    height: '100%',
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
});

export default memo(ProductItem);
