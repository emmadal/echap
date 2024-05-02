import React, {memo, useCallback, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  Image,
  View,
  ActivityIndicator,
} from 'react-native';
import ProductItem from 'components/ProductItem';
import colors from 'themes/colors';
import useArticle from 'hooks/useArticle';
import ErrorUI from './ErrorUI';
import {IPost} from 'types/post';

const wait = (timeout: number) => {
  return new Promise((resolve: any) => setTimeout(resolve, timeout));
};

// component to show when flatList data is empty
const EmptyProduct = () => (
  <View style={styles.emptyView}>
    <Image source={require('assets/empty_posts.gif')} style={styles.emptyImg} />
    <Text style={styles.emptyTitle}>Aucun produit disponible</Text>
  </View>
);

const ProductListing = ({products}: {products: IPost[] | null}) => {
  const {data, isError, isPending, error, refetch} = useArticle();
  const [refreshing, setRefreshing] = useState(false);

  // function which trigger the pull refresh
  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      wait(2000).then(() => {
        setRefreshing(false);
        refetch();
      });
    } catch (err) {
      setRefreshing(false);
    }
  }, [refetch]);

  return (
    <View style={styles.container}>
      {isPending ? (
        <ActivityIndicator color={colors.primary} size="large" />
      ) : isError ? (
        <ErrorUI error={error} refetch={refetch} />
      ) : (
        <FlatList
          data={!products?.length ? data?.data : products}
          style={styles.container}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="automatic"
          keyExtractor={item => String(item?.id)}
          renderItem={({item}) => <ProductItem item={item} />}
          ListEmptyComponent={<EmptyProduct />}
          refreshing={true}
          refreshControl={
            <RefreshControl
              progressBackgroundColor={colors.white}
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.gray.main]}
              tintColor={colors.gray.main}
            />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 85,
  },
  emptyView: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  emptyTitle: {
    fontWeight: '800',
    fontSize: 20,
    color: 'color: rgb(75 85 99)',
    marginTop: 40,
  },
  emptyImg: {
    resizeMode: 'cover',
    justifyContent: 'center',
    marginBottom: -50,
  },
  error: {
    color: colors.error,
    fontSize: 15,
    textAlign: 'center',
  },
});

export default memo(ProductListing);
