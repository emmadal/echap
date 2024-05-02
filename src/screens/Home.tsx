import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Pressable,
  Text,
  TouchableOpacity,
} from 'react-native';
import CategoryListing from 'components/CategoryListing';
import ProductListing from 'components/ProductList';
import SearchBar from 'components/SearchBar';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {optionsFilter} from 'constants/options';
import {IOption} from 'types/option';
import colors from 'themes/colors';
import {searchArticle} from 'api';
import {useStore} from 'store';
import {IPost} from 'types/post';
import {useIsFocused} from '@react-navigation/native';

const Home = () => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [products, setProducts] = useState<IPost[]>([]);
  const sheetRef = useRef<BottomSheet>(null);
  const categoryId = useStore(state => state.category);
  const isFocused = useIsFocused();

  const handleClosePress = useCallback(() => {
    sheetRef.current?.forceClose();
  }, []);

  const snapPoints = useMemo(() => ['30%', '35%', '45%'], []);

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  const renderItem = useCallback(
    ({item}: {item: IOption}) => (
      <TouchableOpacity style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.title}</Text>
      </TouchableOpacity>
    ),
    [],
  );

  useEffect(() => {
    (async () => {
      if (searchPhrase.trim()?.length < 3 || searchPhrase.trim() === '') {
        // Don't do anything when search field is empty or less tha 3 chars
        return;
      } else {
        // call API search to find data which match searching text
        const title = searchPhrase.toLowerCase().trim();
        const req = await searchArticle(categoryId, title);
        setProducts(req?.data ?? []);
      }
    })();
  }, [categoryId, searchPhrase]);

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <SearchBar
          setSearchPhrase={setSearchPhrase}
          searchPhrase={searchPhrase}
          setProducts={setProducts}
          isFocused={isFocused}
        />
        <Pressable style={styles.options} onPress={() => handleSnapPress(1)}>
          <Icon name="options" size={27} color="color: rgb(82 82 82)" />
        </Pressable>
      </View>
      <CategoryListing />
      <ProductListing products={products} />
      <BottomSheet
        ref={sheetRef}
        enablePanDownToClose
        snapPoints={snapPoints}
        index={-1}>
        <TouchableOpacity onPress={handleClosePress} style={styles.closeBtn}>
          <Icon name="close" size={30} color="black" />
        </TouchableOpacity>
        <BottomSheetFlatList
          data={optionsFilter}
          keyExtractor={i => i.id}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
        />
      </BottomSheet>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 40 : 30,
    backgroundColor: colors.gray.light,
    padding: 10,
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  options: {
    marginHorizontal: 10,
  },
  contentContainer: {
    backgroundColor: 'white',
  },
  itemContainer: {
    marginVertical: 10,
    marginLeft: 30,
  },
  itemText: {
    color: '#000',
    fontSize: 20,
  },
  closeBtn: {
    alignSelf: 'flex-end',
    marginRight: 20,
    backgroundColor: 'rgb(229 231 235)',
    borderRadius: 50,
  },
});

export default Home;
