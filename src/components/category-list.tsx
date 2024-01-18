import React from 'react';
import {
  FlatList,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {categoryPost} from 'constants/category';
import {useStore} from 'store';

const ItemSeparator = () => <View style={styles.separatorWidth} />;

const CategoryListing = (): React.JSX.Element => {
  const changeCategory = useStore(state => state.changeCategory);
  const categoryId = useStore(state => state.category);
  return (
    <View style={styles.container}>
      <FlatList
        data={categoryPost}
        horizontal
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={styles.contentContainerStyle}
        showsHorizontalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={
              categoryId === item.id
                ? [styles.categoryPressable, styles.selected]
                : styles.categoryPressable
            }
            onPress={() => changeCategory(item.id)}
            onLongPress={() => changeCategory('')}>
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 35 : 20,
  },
  categoryPressable: {
    width: 'auto',
    borderRadius: 17,
    padding: 8,
    backgroundColor: 'rgb(229 231 235)',
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
    width: 10,
  },
  selected: {
    backgroundColor: 'rgb(249 115 22)',
    borderWidth: 0,
  },
  textSelected: {
    color: 'white',
    fontWeight: '500',
  },
});

export default CategoryListing;
