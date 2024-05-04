import React from 'react';
import {
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewProps,
} from 'react-native';
import colors from 'themes/colors';

interface Props extends ViewProps {
  /**
   * Label text of the chip.
   */
  children: React.ReactNode;
  /**
   * Background color for the chip element
   */
  bgColor?: string;
  /**
   * text color fo the chip content
   */
  textColor?: string;
  /**
   * testID to be used on tests.
   */
  testID?: string;
}
const Chip = ({bgColor, children, textColor}: Props) => {
  const {width} = useWindowDimensions();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: bgColor || colors.primary,
          width: width / 2.7,
        },
      ]}>
      <Text
        style={[
          styles.text,
          {
            color: textColor || colors.white,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 18,
    paddingVertical: 8,
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    elevation: 20,
    shadowOpacity: 0.58,
    shadowRadius: 5.0,
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
  },
});
export default Chip;
