import React from 'react';
import {StyleSheet, TextInput, View, Keyboard, Button} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  clicked: boolean;
  searchPhrase: string;
  setCLicked: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchPhrase: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar = ({
  clicked,
  searchPhrase,
  setSearchPhrase,
  setCLicked,
}: Props): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <View
        style={
          clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
        }>
        {/* search Icon */}
        <Icon name="search" size={20} color="rgb(115 115 115)" />
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Recherche..."
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => setCLicked(true)}
        />
      </View>
      {/* cancel button, depending on whether the search bar is clicked or not */}
      {clicked && (
        <Button
          title="Annuler"
          onPress={() => {
            Keyboard.dismiss();
            setCLicked(false);
            setSearchPhrase('');
          }}
        />
      )}
    </View>
  );
};
export default SearchBar;

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 10,
    width: '70%',
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: 'row',
    width: '95%',
    backgroundColor: 'rgb(243 244 246)',
    borderRadius: 25,
    alignItems: 'center',
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: 'row',
    width: '83%',
    backgroundColor: 'rgb(229 231 235)',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  input: {
    fontSize: 18,
    marginLeft: 10,
    width: '90%',
  },
});
