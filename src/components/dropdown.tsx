import React, {FC, useState} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {View, StyleSheet, ViewStyle} from 'react-native';
import colors from 'themes/colors';
import Icon from 'react-native-vector-icons/Feather';

const ChevronDown = () => (
  <Icon name="chevron-down" size={24} color={colors.text} />
);

type Props = {
  data: any[];
  setValue: any;
  placeholderText: string;
  name: string;
  style?: ViewStyle;
};

const Dropdown: FC<Props> = ({
  data,
  setValue,
  placeholderText,
  name,
  style,
}) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const placeholder = {
    label: placeholderText,
    value: null,
  };

  return (
    <View style={style}>
      <RNPickerSelect
        placeholder={placeholder}
        items={data}
        doneText="Choisir"
        onValueChange={text => {
          setValue(`${name}`, Number(text));
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
            top: 15,
            right: 12,
          },
        }}
      />
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    textAlign: 'auto',
    backgroundColor: colors.white,
    color: colors.text,
    borderWidth: 3,
    borderColor: colors.white,
    borderRadius: 10,
    padding: 13,
    fontSize: 18,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    elevation: 20,
    shadowOpacity: 0.58,
    shadowRadius: 5.0,
    paddingRight: 30,
  },
  inputAndroid: {
    textAlign: 'auto',
    backgroundColor: colors.white,
    color: colors.text,
    borderWidth: 3,
    borderColor: colors.white,
    borderRadius: 10,
    padding: 13,
    fontSize: 18,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    elevation: 20,
    shadowOpacity: 0.58,
    shadowRadius: 5.0,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default Dropdown;
