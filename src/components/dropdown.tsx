import React, {FC, useState} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {View, StyleSheet} from 'react-native';
import colors from 'themes/colors';
import Icon from 'react-native-vector-icons/Feather';

const ChevronDown = () => (
  <Icon name="chevron-down" size={24} color={colors.text} />
);

type Props = {
  categories: any[];
  setValue: any;
};

const Dropdown: FC<Props> = ({categories, setValue}) => {
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
          setValue('category_id', Number(text));
          setSelectedValue(text);
        }}
        value={selectedValue}
        textInputProps={{
          underlineColorAndroid: 'transparent',
          autoCapitalize: 'none',
          selectionColor: colors.primary,
          placeholderTextColor: colors.text,
        }}
        useNativeAndroidPickerStyle={false}
        Icon={() => (<ChevronDown />) as React.ReactNode}
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

const styles = StyleSheet.create({
  viewInput: {
    flex: 1,
  },
  inputIOS: {
    fontSize: 15,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: colors.text,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 15,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: colors.text,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 15,
    paddingVertical: 12,
    paddingHorizontal: 10,
    textAlign: 'auto',
    borderWidth: 0.6,
    borderColor: colors.text,
    backgroundColor: colors.gray.light,
    borderRadius: 2,
    color: colors.text,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 15,
    paddingVertical: 12,
    paddingHorizontal: 10,
    textAlign: 'auto',
    borderWidth: 0.6,
    borderColor: colors.text,
    backgroundColor: colors.gray.light,
    borderRadius: 2,
    color: colors.text,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
export default Dropdown;
