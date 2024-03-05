import {StyleSheet, View} from 'react-native';
import React from 'react';
import colors from 'themes/colors';

type Props = {
  dialPadContent: Array<number | string>;
  code: never[];
  pinSize: number;
  pinLength: number;
};

const DialpadPin = ({pinLength, pinSize, code, dialPadContent}: Props) => {
  return (
    <View style={styles.dialPadPinContainer}>
      {Array(pinLength)
        .fill()
        .map((_, index) => {
          const item = dialPadContent[index];
          const isSelected =
            typeof item === 'number' && code[index] !== undefined;
          return (
            <View
              key={index}
              style={{
                width: pinSize,
                height: pinSize,
                borderRadius: pinSize / 2,
                overflow: 'hidden',
                marginHorizontal: 5,
              }}>
              <View
                style={[
                  {
                    borderRadius: pinSize / 2,
                    borderColor: !isSelected ? 'lightgrey' : colors.gray.main,
                  },
                  styles.pinContentContainer,
                ]}>
                {isSelected && (
                  <View
                    style={[
                      {
                        width: pinSize * 0.5,
                        height: pinSize * 0.5,
                        borderRadius: pinSize * 0.35,
                      },
                      styles.pinContent,
                    ]}
                  />
                )}
              </View>
            </View>
          );
        })}
    </View>
  );
};

export default DialpadPin;

const styles = StyleSheet.create({
  dialPadPinContainer: {
    flexDirection: 'row',
    marginVertical: 13,
    justifyContent: 'space-between',
  },
  pinContentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinContent: {
    backgroundColor: colors.success,
  },
});
