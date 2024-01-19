import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabBar from 'routes/TabBar';

const Stack = createStackNavigator();

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
    </Stack.Navigator>
  );
};

export default MyStack;
