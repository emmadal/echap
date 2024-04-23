import React, {memo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabBar from 'routes/TabBar';
import Product from 'screens/Product';
import Icon from 'react-native-vector-icons/Feather';
import {StyleSheet} from 'react-native';
import colors from 'themes/colors';
import EditProfile from 'screens/EditProfile';
import Support from 'screens/Support';

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
    color={colors.white}
  />
));

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabBar"
        component={TabBar}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Product"
        component={Product}
        options={({route}: any) => ({
          headerBackTitleVisible: false,
          title: splitTitle(route?.params?.title),
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: 'white',
          },
          headerStyle: {
            borderBottomColor: 'transparent',
            borderBottomWidth: 0,
            backgroundColor: colors.primary,
          },
          headerBackImage: () => (<BackIcon />) as React.ReactNode,
        })}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerBackTitleVisible: false,
          title: 'Modifier mon profil',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTitleStyle: {
            color: 'white',
          },
          headerBackImage: () => (<BackIcon />) as React.ReactNode,
        }}
      />
      <Stack.Screen
        name="Support"
        component={Support}
        options={{
          headerBackTitleVisible: false,
          title: 'Support',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTitleStyle: {
            color: 'white',
          },
          headerBackImage: () => (<BackIcon />) as React.ReactNode,
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

export default MyStack;
