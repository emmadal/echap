import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  FlatList,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {categoryPost} from 'constants/category';
import type {ICategory} from 'types/category';

type Props = PropsWithChildren<{
  categories: Array<ICategory>;
}>;

const CategoryFlatList = ({categories}: Props): React.JSX.Element => (
  <FlatList
    data={categories}
    horizontal
    ItemSeparatorComponent={() => <View style={{width: 10}} />}
    contentContainerStyle={styles.contentContainerStyle}
    showsHorizontalScrollIndicator={false}
    contentInsetAdjustmentBehavior="automatic"
    keyExtractor={item => item.id}
    renderItem={({item}) => (
      <TouchableOpacity style={[styles.categoryPressable]}>
        <Text style={styles.categoryText}>{item.title}</Text>
      </TouchableOpacity>
    )}
  />
);

const CategoryListing = (): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <CategoryFlatList categories={categoryPost} />
    </View>
  );
};

export default CategoryListing;

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 35 : 20,
  },
  categoryPressable: {
    width: 'auto',
    borderRadius: 17,
    padding: 9,
    backgroundColor: 'rgb(229 231 235)',
  },
  categoryText: {
    fontSize: 15,
    fontWeight: '400',
    color: 'rgb(38 38 38)',
  },
  columnWrapperStyle: {
    flexWrap: 'wrap',
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
});
