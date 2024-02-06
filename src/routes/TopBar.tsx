import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {View, Text} from 'react-native';
import colors from 'themes/colors';

const Tab = createMaterialTopTabNavigator();

const Test = () => (
  <View>
    <Text>Hello</Text>
  </View>
);
const TopBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.dark,
          borderRadius: 5,
        },
      }}>
      <Tab.Screen
        name="MyProducts"
        component={Test}
        options={{
          tabBarLabelStyle: {
            fontWeight: '700',
            fontSize: 11,
          },
          tabBarLabel: 'Mes articles',
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.white,
          tabBarIndicatorStyle: {
            backgroundColor: colors.primary,
            height: 3,
            width: 40,
            left: '11%',
          },
        }}
      />
      <Tab.Screen
        name="Account"
        component={Test}
        options={{
          tabBarLabelStyle: {
            fontWeight: '700',
            fontSize: 11,
          },
          tabBarLabel: 'Mon Compte',
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.white,
          tabBarIndicatorStyle: {
            backgroundColor: colors.primary,
            height: 3,
            width: 40,
            left: '11%',
          },
        }}
      />
      <Tab.Screen
        name="Subscription"
        component={Test}
        options={{
          tabBarLabelStyle: {
            fontWeight: '700',
            fontSize: 11,
          },
          tabBarLabel: 'Abonnement',
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.white,
          tabBarIndicatorStyle: {
            backgroundColor: colors.primary,
            height: 3,
            width: 40,
            left: '11%',
          },
        }}
      />
    </Tab.Navigator>
  );
};
export default TopBar;
