import React, {useState} from 'react';
import {Platform, StyleSheet, View, Pressable} from 'react-native';
import CategoryListing from 'components/category-list';
import ProductListing from 'components/product-list';
import SearchBar from 'components/search-bar';
import Icon from 'react-native-vector-icons/Ionicons';

const Home = () => {
  const [clicked, setCLicked] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState('');
  return (
    <View style={styles.container}>
      <CategoryListing />
      <View style={styles.inputView}>
        <SearchBar
          setCLicked={setCLicked}
          clicked={clicked}
          setSearchPhrase={setSearchPhrase}
          searchPhrase={searchPhrase}
        />
        <Pressable style={styles.options}>
          <Icon name="options" size={27} color="color: rgb(82 82 82)" />
        </Pressable>
      </View>
      <ProductListing />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 40 : 25,
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  options: {
    marginRight: 10,
  },
});

export default Home;
