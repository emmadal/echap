import React, {memo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';
import {StyleSheet} from 'react-native';
import colors from 'themes/colors';
import Login from 'screens/Login';
import Register from 'screens/Register';
import OTP from 'screens/OTP';

const Stack = createStackNavigator();

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
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          title: 'Création de compte',
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
          headerStyle: {
            borderBottomColor: 'transparent',
            borderBottomWidth: 0,
          },
          headerBackImage: () => (<BackIcon />) as React.ReactNode,
        }}
      />
      <Stack.Screen
        name="OTP"
        component={OTP}
        options={{
          title: 'Validation OTP',
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
          headerStyle: {
            borderBottomColor: 'transparent',
            borderBottomWidth: 0,
          },
          headerBackImage: () => null,
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
