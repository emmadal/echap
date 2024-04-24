import React, {memo} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, StyleSheet, useWindowDimensions, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Home from 'screens/Home';
import colors from 'themes/colors';
import CreateProduct from 'screens/CreateProduct';
import Profile from 'screens/Profile';
import Avatar from 'components/Avatar';
import {useStore} from 'store';
import Settings from 'screens/Settings';
import Message from 'screens/Message';

const Tab = createBottomTabNavigator();

type TabIconProps = {
  focused: boolean;
  icon: string;
};

const TabIcon = memo(({focused, icon}: TabIconProps) => (
  <Icon
    name={icon}
    size={22}
    color={focused ? colors.white : 'rgba(255, 255, 255, 0.5)'}
  />
));

const TabBar = () => {
  const {height} = useWindowDimensions();
  const user = useStore(state => state.user);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 47,
          position: 'absolute',
          backgroundColor: colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 5,
          left: 25,
          right: 25,
          bottom: 25,
          borderRadius: 50,
          paddingBottom: 0,
        },
        tabBarAllowFontScaling: true,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            (<TabIcon focused={focused} icon="home" />) as React.ReactNode,
        }}
      />
      <Tab.Screen
        name="Message"
        component={Message}
        options={{
          headerTitle: 'Messagerie',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTitleStyle: {
            color: 'white',
          },
          tabBarIcon: ({focused}) =>
            (<TabIcon focused={focused} icon="mail" />) as React.ReactNode,
        }}
      />
      <Tab.Screen
        name="CreateProduct"
        component={CreateProduct}
        options={{
          headerTitle: 'Ajouter un article',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTitleStyle: {
            color: 'white',
          },
          tabBarIcon: ({focused}) =>
            (
              <View style={styles.pluscircle}>
                <Icon
                  name="pluscircleo"
                  size={40}
                  color={focused ? colors.primary : colors.dark}
                />
              </View>
            ) as React.ReactNode,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: () =>
            (
              <Pressable style={styles.imgContainer}>
                {user?.photo ? (
                  <Avatar source={user?.photo} size={100} />
                ) : (
                  <View style={styles.iconImg}>
                    <Icon name="picture" size={50} color={colors.text} />
                  </View>
                )}
              </Pressable>
            ) as React.ReactNode,
          headerStyle: {
            backgroundColor: colors.primary,
            height: height / 4.5,
            borderBottomEndRadius: 300,
          },
          headerBackgroundContainerStyle: {
            backgroundColor: colors.white,
          },
          tabBarIcon: ({focused}) =>
            (<TabIcon focused={focused} icon="user" />) as React.ReactNode,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerTitle: 'Paramètres',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTitleStyle: {
            color: 'white',
          },
          tabBarLabelStyle: {
            fontSize: 13,
            fontWeight: 'bold',
          },
          tabBarIcon: ({focused}) =>
            (<TabIcon focused={focused} icon="setting" />) as React.ReactNode,
          tabBarActiveTintColor: colors.navigation.focused,
          tabBarInactiveTintColor: colors.navigation.normal,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  pluscircle: {
    top: -20,
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: colors.white,
  },
  imgContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: -50,
    borderWidth: 5,
    borderColor: colors.white,
    borderRadius: 100,
    backgroundColor: colors.white,
  },
  iconImg: {
    borderWidth: 2,
    borderColor: colors.gray.main,
    borderRadius: 50,
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TabBar;
