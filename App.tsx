import React, {useEffect} from 'react';
import {AppState, Platform, StyleSheet} from 'react-native';
import type {AppStateStatus} from 'react-native';
import {focusManager} from '@tanstack/react-query';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import MyStack from 'routes/MyStack';
import OnBoarding from 'routes/OnBoarding';
import {useStore} from 'store';

function App(): React.JSX.Element {
  const logout = useStore(state => state.logout);
  const onAppStateChange = (status: AppStateStatus) => {
    if (Platform.OS !== 'web') {
      focusManager.setFocused(status === 'active');
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);
    return () => subscription.remove();
  }, []);

  return (
    <NavigationContainer>
      <GestureHandlerRootView style={styles.container}>
        {logout ? <OnBoarding /> : <MyStack />}
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
