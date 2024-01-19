import React, {memo, useMemo} from 'react';
import {FlatList, StyleSheet, Text, Image, View} from 'react-native';
import {posts} from 'constants/posts';
import ProductItem from 'components/product-item';
import {useStore} from 'store';

const EmptyProduct = () => (
  <View style={styles.emptyView}>
    <Image source={require('assets/empty_posts.gif')} style={styles.emptyImg} />
    <Text style={styles.emptyTitle}>Aucun produit disponible</Text>
  </View>
);

const ItemSeparator = () => <View style={styles.separatorWidth} />;

const ProductListing = ({search}: {search: string}) => {
  const store = useStore(state => state.category);

  // return a memoize product array
  const products = useMemo(() => {
    if (store) {
      const items = posts.filter(item => item.categoryId === store);
      if (search) {
        const data = items.filter(i =>
          i.title.toLowerCase().includes(search.toLowerCase()),
        );
        return data;
      }
      return items;
    }
    return [];
  }, [store, search]);

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
