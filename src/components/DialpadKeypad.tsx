import React from 'react';
import {useFormContext} from 'react-hook-form';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import colors from 'themes/colors';

type Props = {
  dialPadContent: Array<number | string>;
  code: never[];
  setCode: React.Dispatch<React.SetStateAction<never[]>>;
  dialPadSize: number;
  dialPadTextSize: number;
};

const DialpadKeypad = ({
  dialPadContent,
  code,
  setCode,
  dialPadSize,
  dialPadTextSize,
}: Props) => {
  const {setValue} = useFormContext();

  const handlePressKey = (item: string | number) => {
    if (item === 'X') {
      setCode(prev => prev.slice(0, -1));
      setValue('phone', String(code.slice(0, -1)).replaceAll(',', ''));
    } else {
      const value = [...code, item];
      if (value.length < 11) {
        setCode(value as never[]);
        setValue('phone', String(value).replaceAll(',', ''));
        return;
      }
      return;
    }
  };
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{flexGrow: 1}}
      data={dialPadContent}
      numColumns={3} // set number of columns
      keyExtractor={(_, index) => index.toString()}
      renderItem={({item}) => {
        return (
          <TouchableOpacity
            disabled={item === ''} // make the empty space on the dialpad content unclickable
            onPress={() => handlePressKey(item)}>
            <View
              style={[
                {
                  backgroundColor: item === '' ? 'transparent' : colors.white,
                  width: dialPadSize,
                  height: dialPadSize,
                },
                styles.dialPadContainer,
              ]}>
              {item === 'X' ? (
                <Icon name="delete" size={24} color={colors.text} />
              ) : (
                <Text style={[{fontSize: dialPadTextSize}, styles.dialPadText]}>
                  {item}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  dialPadContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
  dialPadText: {
    color: colors.text,
  },
});

export default DialpadKeypad;
