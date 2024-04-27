import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {View, Text, useWindowDimensions, StyleSheet} from 'react-native';
import colors from 'themes/colors';
import MyArticles from 'components/MyArticles';

const Tab = createMaterialTopTabNavigator();

const Test = () => (
  <View>
    <Text>Hello</Text>
  </View>
);
const TopBar = () => {
  const {width} = useWindowDimensions();
  return (
    <Tab.Navigator
      sceneContainerStyle={styles.scene}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.dark,
        },
      }}>
      <Tab.Screen
        name="MyProducts"
        component={MyArticles}
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
            width: width / 8,
            left: '18%',
          },
        }}
      />
      <Tab.Screen
        name="MyStore"
        component={Test}
        options={{
          tabBarLabelStyle: {
            fontWeight: '700',
            fontSize: 11,
          },
          tabBarLabel: 'Ma Boutique',
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.white,
          tabBarIndicatorStyle: {
            backgroundColor: colors.primary,
            height: 3,
            width: width / 8,
            left: '18%',
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  scene: {
    backgroundColor: 'transparent',
  },
});
export default TopBar;
