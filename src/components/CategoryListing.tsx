import React from 'react';
import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {useStore} from 'store';
import useCategory from 'hooks/useCategory';
import colors from 'themes/colors';
import Icon from 'react-native-vector-icons/Ionicons';
const ItemSeparator = () => <View style={styles.separatorWidth} />;

const EmptyItem = () => (
  <View style={styles.emptyView}>
    <Text style={styles.empty}>Aucune categorie</Text>
  </View>
);

const CategoryListing = (): React.JSX.Element => {
  const changeCategory = useStore(state => state.changeCategory);
  const categoryId = useStore(state => state.category);
  const {isPending, isError, data, error, refetch} = useCategory();

  return (
    <SafeAreaView style={styles.container}>
      {isPending ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : isError ? (
        <TouchableOpacity onPress={() => refetch()} style={styles.catError}>
          <Text style={styles.error}>{error?.message}</Text>
          <Icon color={colors.text} name="refresh" size={20} />
        </TouchableOpacity>
      ) : (
        <FlatList
          data={data?.data || []}
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
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  categoryPressable: {
    width: 'auto',
    borderRadius: 17,
    padding: 8,
    backgroundColor: colors.gray.focus,
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
    backgroundColor: colors.primary,
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
  error: {
    color: colors.error,
    fontSize: 15,
    textAlign: 'center',
  },
  catError: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CategoryListing;
