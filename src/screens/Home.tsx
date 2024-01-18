import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Pressable,
  Text,
  TouchableOpacity,
} from 'react-native';
import CategoryListing from 'components/category-list';
import ProductListing from 'components/product-list';
import SearchBar from 'components/search-bar';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {optionsFilter} from 'constants/options';
import {IOption} from 'types/option';

const Home = () => {
  const [clicked, setCLicked] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState('');
  const sheetRef = useRef<BottomSheet>(null);

  const handleSheetChange = useCallback((index: number) => {
    console.log('handleSheetChange', index);
  }, []);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.forceClose();
  }, []);

  const snapPoints = useMemo(() => ['30%', '35%'], []);

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
        <Pressable style={styles.options} onPress={() => handleSnapPress(1)}>
          <Icon name="options" size={27} color="color: rgb(82 82 82)" />
        </Pressable>
      </View>
      <ProductListing />
      <BottomSheet
        ref={sheetRef}
        enablePanDownToClose
        snapPoints={snapPoints}
        onChange={handleSheetChange}>
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
