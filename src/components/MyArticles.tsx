import {useNavigation} from '@react-navigation/native';
import useMyArticle from 'hooks/useMyArticle';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
} from 'react-native';
import colors from 'themes/colors';
import Icon from 'react-native-vector-icons/Feather';
import Loader from './Loader';

// component to show when flatList data is empty
const EmptyProduct = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.emptyView}>
      <Icon name="file-text" size={40} color={colors.text} />
      <Text style={styles.emptyTitle}>Aucun produit disponible</Text>
      <Pressable
        style={styles.btn}
        onPress={() => navigation.navigate('CreateProduct')}>
        <Text style={styles.btnText}>Ajouter</Text>
      </Pressable>
    </View>
  );
};

const MyArticles = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(false);
  const navigation: any = useNavigation();
  const {
    data,
    isPending,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useMyArticle();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
  }, [fadeAnim]);

  const loadMore = () => {
    if (hasNextPage || isFetchingNextPage) {
      fetchNextPage();
    }
  };
  return isPending ? (
    <ActivityIndicator
      color={colors.primary}
      size="large"
      style={styles.indicator}
    />
  ) : isError ? (
    <Text style={styles.error}>{error?.message}</Text>
  ) : (
    <Animated.FlatList
      style={[styles.container, {opacity: fadeAnim}]}
      data={data?.pages[0]?.data}
      horizontal={false}
      numColumns={2}
      contentInsetAdjustmentBehavior="automatic"
      keyExtractor={item => String(item?.id)}
      columnWrapperStyle={styles.columnWrapperStyle}
      contentContainerStyle={styles.contentContainerStyle}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => (
        <Pressable
          style={styles.renderView}
          onPress={() => {
            navigation.navigate('Product', {
              ...item,
            });
          }}>
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
        </Pressable>
      )}
      ListEmptyComponent={<EmptyProduct />}
      ListFooterComponent={isFetchingNextPage ? Loader : null}
      ListFooterComponentStyle={styles.footer}
      onEndReachedThreshold={0}
      onEndReached={() => loadMore()}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  error: {
    color: colors.error,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 20,
  },
  renderView: {
    flex: 1,
    marginTop: 5,
  },
  emptyView: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontWeight: '500',
    fontSize: 17,
    color: colors.text,
    marginTop: 10,
  },
  btn: {
    borderRadius: 5,
    backgroundColor: colors.primary,
    alignSelf: 'center',
    padding: 11,
    width: 100,
    marginTop: 10,
  },
  btnText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '600',
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  columnWrapperStyle: {
    flexWrap: 'wrap',
  },
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  footer: {
    alignSelf: 'center',
    marginVertical: 5,
  },
  image: {
    resizeMode: 'repeat',
    justifyContent: 'center',
    height: 180,
    width: 133,
    borderRadius: 10,
    margin: 1,
  },
  indicator: {
    marginTop: 20,
  },
});

export default MyArticles;
