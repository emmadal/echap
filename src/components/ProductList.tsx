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

const ItemSeparator = () => <View style={styles.separatorWidth} />;

const ProductListing = ({search}: {search: string}) => {
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
  }, []);

  const filterData = () => {
    const results = data?.data?.filter((i: {title: string}) =>
      i.title.toLowerCase().includes(search.toLowerCase()),
    );
    return results || data?.data;
  };

  return (
    <View style={styles.container}>
      {isPending ? (
        <ActivityIndicator color={colors.primary} size="large" />
      ) : isError ? (
        <ErrorUI error={error} refetch={refetch} />
      ) : (
        <FlatList
          data={filterData() || []}
          ItemSeparatorComponent={ItemSeparator}
          style={styles.container}
          horizontal={false}
          columnWrapperStyle={styles.columnWrapperStyle}
          contentContainerStyle={styles.contentContainerStyle}
          numColumns={2}
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
  columnWrapperStyle: {
    flexWrap: 'wrap',
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 85,
  },
  separatorWidth: {
    height: 80,
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
