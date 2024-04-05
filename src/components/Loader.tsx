import React from 'react';
import {ActivityIndicator} from 'react-native';
import colors from 'themes/colors';

const Loader = () => {
  return <ActivityIndicator color={colors.primary} size="small" />;
};

export default Loader;
