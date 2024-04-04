import React, {memo} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Home from 'screens/Home';
import colors from 'themes/colors';
import CreateProduct from 'screens/CreateProduct';
import Profile from 'screens/Profile';
import Avatar from 'components/Avatar';

const Tab = createBottomTabNavigator();

const Test = () => (
  <View>
    <Text>Hello</Text>
  </View>
);

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
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 55,
          position: 'absolute',
          backgroundColor: colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 5,
          left: 25,
          right: 25,
          bottom: 30,
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
        component={Test}
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
                  size={45}
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
          headerTitle: () => (
            <Pressable style={styles.imgContainer}>
              <Avatar
                source="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg"
                size={100}
              />
            </Pressable>
          ),
          headerStyle: {
            backgroundColor: colors.primary,
            height: height / 4.5,
            // borderBottomRightRadius: 200,
            // borderBottomLeftRadius: 200,
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
        component={Test}
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
    width: 45,
    height: 45,
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
});

export default TabBar;
