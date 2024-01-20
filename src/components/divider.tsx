import React from 'react';
import {StyleSheet, View} from 'react-native';
import colors from 'themes/colors';

const Divider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    borderRadius: 2,
  },
});
export default Divider;
