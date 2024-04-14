import React, {useEffect} from 'react';
import {AppState, Platform, StyleSheet} from 'react-native';
import type {AppStateStatus} from 'react-native';
import {focusManager} from '@tanstack/react-query';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import MyStack from 'routes/MyStack';
import OnBoarding from 'routes/OnBoarding';
import {useStore} from 'store';

function App(): React.JSX.Element {
  const logout = useStore(state => state.logout);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2500);
  }, []);

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
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer>
        {logout ? <OnBoarding /> : <MyStack />}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
