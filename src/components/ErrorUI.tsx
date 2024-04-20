import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import colors from 'themes/colors';

const ErrorUI = ({
  error,
  refetch,
}: {
  error: Error | null;
  refetch: () => void;
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  // Show error UI with animation
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
  }, []);
  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      <Image source={require('assets/error.png')} style={styles.emptyImg} />
      <Text style={styles.emptyTitle}>{error?.message}</Text>
      <TouchableOpacity style={styles.button} onPress={() => refetch()}>
        <Text style={styles.btnText}>Ressayer</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  emptyImg: {
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontWeight: '800',
    fontSize: 20,
    color: 'color: rgb(75 85 99)',
    marginTop: 40,
  },
  button: {
    borderRadius: 10,
    backgroundColor: 'transparent',
    borderColor: colors.error,
    borderWidth: 1,
    padding: 8,
    marginTop: 40,
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 17,
    fontWeight: '500',
    color: colors.text,
  },
});

export default ErrorUI;
