import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import CategoryListing from 'components/category-list';
import ProductListing from 'components/product-list';

const Home = () => {
  return (
    <View style={styles.container}>
      <CategoryListing />
      <ProductListing />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 40 : 25,
  },
});

export default Home;
