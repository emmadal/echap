import React, {memo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Feather';
import {StyleSheet} from 'react-native';
import colors from 'themes/colors';
import Login from 'screens/Login';

const Stack = createStackNavigator();

const splitTitle = (title: string): string => {
  if (title.length > 22) {
    return title.slice(0, 22) + '...';
  }
  return title;
};

const BackIcon = memo(() => (
  <Icon
    name="chevron-left"
    size={28}
    style={styles.backIcon}
    color={colors.text}
  />
));

const OnBoarding = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  backIcon: {
    marginLeft: 10,
  },
});

export default OnBoarding;
