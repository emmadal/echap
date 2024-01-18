import React from 'react';
import {FlatList, Pressable, StyleSheet, Text, Image, View} from 'react-native';
import {posts} from 'constants/posts';

const EmptyProduct = () => (
  <View style={styles.emptyView}>
    <Image source={require('assets/empty_posts.gif')} style={styles.emptyImg} />
    <Text style={styles.emptyTitle}>Aucun produit disponible</Text>
  </View>
);

const ItemSeparator = () => <View style={styles.separatorWidth} />;

const ProductListing = (): React.JSX.Element => {
  return (
    <FlatList
      data={posts}
      ItemSeparatorComponent={ItemSeparator}
      horizontal={false}
      columnWrapperStyle={styles.columnWrapperStyle}
      contentContainerStyle={styles.contentContainerStyle}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
      keyExtractor={item => item?.id as string}
      renderItem={({item}) => (
        <Pressable style={styles.card} onPress={() => {}}>
          <Image source={{uri: item.banner}} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
        </Pressable>
      )}
      ListEmptyComponent={<EmptyProduct />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
  },
  image: {
    resizeMode: 'cover',
    justifyContent: 'center',
    height: '100%',
    borderRadius: 5,
  },
  columnWrapperStyle: {
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: 'rgb(229 231 235)',
    flex: 1,
    margin: 10,
    maxHeight: 250,
    borderRadius: 5,
    maxWidth: '50%',
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 85,
  },
  separatorWidth: {
    height: 80,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4a4a4a',
    marginTop: 3,
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

export default ProductListing;
