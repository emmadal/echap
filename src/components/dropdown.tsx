import React, {FC, useState} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {View, StyleSheet} from 'react-native';
import colors from 'themes/colors';
import Icon from 'react-native-vector-icons/Feather';
import {ICategory} from 'types/category';

const ChevronDown = () => (
  <Icon name="chevron-down" size={24} color={colors.text} />
);

type Props = {
  categories: ICategory[];
  setFieldValue: any;
};

const Dropdown: FC<Props> = ({categories, setFieldValue}) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const placeholder = {
    label: 'Selectionnez une catégorie',
    value: null,
  };

  return (
    <View style={styles.viewInput}>
      <RNPickerSelect
        placeholder={placeholder}
        items={categories}
        doneText="Choisir"
        onValueChange={text => {
          setFieldValue('categoryId', text);
          setSelectedValue(text);
        }}
        value={selectedValue}
        textInputProps={{
          underlineColorAndroid: 'transparent',
          autoCapitalize: 'none',
          selectionColor: colors.primary,
        }}
        useNativeAndroidPickerStyle={false}
        Icon={() => <ChevronDown />}
        style={{
          ...pickerSelectStyles,
          iconContainer: {
            top: 10,
            right: 12,
          },
        }}
      />
    </View>
  );
};
// allowAsProps
const styles = StyleSheet.create({
  viewInput: {
    flex: 1,
    marginTop: 20,
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.gray.main,
    backgroundColor: colors.gray.light,
    borderRadius: 2,
    color: colors.text,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
export default Dropdown;
