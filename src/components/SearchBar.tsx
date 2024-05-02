import React from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {
  StyleSheet,
  TextInput,
  View,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import {useStore} from 'store';
import colors from 'themes/colors';
import {IPost} from 'types/post';

type Props = {
  searchPhrase: string;
  setSearchPhrase: React.Dispatch<React.SetStateAction<string>>;
  setProducts: React.Dispatch<React.SetStateAction<IPost[]>>;
  isFocused: boolean;
};

const SearchBar = ({
  searchPhrase,
  setSearchPhrase,
  setProducts,
  isFocused,
}: Props): React.JSX.Element => {
  const queryClient = useQueryClient();
  const category_id = useStore(state => state.category);

  const handleKeyPress = async (
    key: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    if (key.nativeEvent.key === 'Backspace') {
      await queryClient.invalidateQueries({
        queryKey: ['articles', category_id],
      });
      setProducts([]);
      setSearchPhrase('');
      return;
    }
  };

  return (
    <View style={styles.searchBar}>
      <TextInput
        style={styles.input}
        placeholder="Votre recherche ici..."
        placeholderTextColor={colors.gray.main}
        value={searchPhrase}
        onChangeText={setSearchPhrase}
        onKeyPress={handleKeyPress}
        maxLength={24}
        cursorColor={colors.primary}
        editable={isFocused ? true : false}
      />
    </View>
  );
};
export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    flex: 1,
    marginVertical: 15,
    backgroundColor: 'rgb(243 244 246)',
    borderRadius: 25,
    padding: 13,
    fontSize: 18,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    elevation: 20,
    shadowOpacity: 2,
    shadowRadius: 5.0,
  },
  input: {
    fontSize: 18,
    marginLeft: 10,
    textAlign: 'auto',
  },
});
