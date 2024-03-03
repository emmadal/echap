import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import MyStack from 'routes/MyStack';
import OnBoarding from 'routes/OnBoarding';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={styles.container}>
        {/* <MyStack /> */}
        <OnBoarding />
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
