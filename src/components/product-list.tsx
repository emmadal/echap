import React, {memo, useCallback, useMemo, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';
import {posts} from 'constants/posts';
import ProductItem from 'components/product-item';
import {useStore} from 'store';
import colors from 'themes/colors';

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
  // Get the categoryId from global state
  const categoryId = useStore(state => state.category);
  const [refreshing, setRefreshing] = useState(false);

  // return a memoized products array by categories or by name search
  const products = useMemo(() => {
    if (categoryId) {
      const items = posts.filter(item => item.categoryId === categoryId);
      if (search) {
        const data = items.filter(i =>
          i.title.toLowerCase().includes(search.toLowerCase()),
        );
        return data;
      }
      return items;
    }
    return [];
  }, [categoryId, search]);

  // function which trigger the pull refresh
  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      wait(2000).then(() => {
        setRefreshing(false);
      });
    } catch (error) {
      setRefreshing(false);
    }
  }, []);

  return (
    <FlatList
      data={products}
      ItemSeparatorComponent={ItemSeparator}
      horizontal={false}
      columnWrapperStyle={styles.columnWrapperStyle}
      contentContainerStyle={styles.contentContainerStyle}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
      keyExtractor={item => item?.id as string}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
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
});

export default memo(ProductListing);
