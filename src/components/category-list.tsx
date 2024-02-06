import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import {useStore} from 'store';
import {getCategories} from 'api';
import {ICategory} from 'types/category';

const ItemSeparator = () => <View style={styles.separatorWidth} />;

const EmptyItem = () => (
  <View style={styles.emptyView}>
    <Text style={styles.empty}>Aucune categorie </Text>
  </View>
);

const CategoryListing = (): React.JSX.Element => {
  const changeCategory = useStore(state => state.changeCategory);
  const categoryId = useStore(state => state.category);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const handleCategories = async () => {
    const response = await getCategories();
    setCategories(response);
  };

  useEffect(() => {
    handleCategories();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={categories}
        horizontal
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={styles.contentContainerStyle}
        showsHorizontalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <TouchableOpacity
            style={
              categoryId === item.id
                ? [styles.categoryPressable, styles.selected]
                : styles.categoryPressable
            }
            onPress={() => changeCategory(item.id)}
            onLongPress={() => changeCategory(0)}>
            <Text
              style={
                categoryId === item.id
                  ? [styles.categoryText, styles.textSelected]
                  : styles.categoryText
              }>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<EmptyItem />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 40 : 20,
  },
  categoryPressable: {
    width: 'auto',
    borderRadius: 17,
    padding: 8,
    backgroundColor: 'rgb(229 231 235)',
    margin: 5,
  },
  categoryText: {
    fontSize: 17,
    fontWeight: '400',
    color: 'rgb(38 38 38)',
  },
  columnWrapperStyle: {
    flexWrap: 'wrap',
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  separatorWidth: {
    width: 3,
  },
  selected: {
    backgroundColor: 'rgb(249 115 22)',
    borderWidth: 0,
  },
  textSelected: {
    color: 'white',
    fontWeight: '500',
  },
  empty: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  emptyView: {
    flex: 1,
    marginVertical: 10,
  },
});

export default CategoryListing;
