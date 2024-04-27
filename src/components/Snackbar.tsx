import React, {useCallback, useEffect, useRef} from 'react';
import {StyleSheet, Text, Animated, Dimensions} from 'react-native';
import colors from 'themes/colors';

type Props = {
  children: React.ReactNode;
  visible: boolean;
  duration?: number; // in ms.
  onDissmiss: () => void;
  textColor?: string;
  bgColor?: string;
};
const Snackbar = ({
  children,
  visible = false,
  duration = 4000,
  textColor = 'white',
  onDissmiss,
  bgColor = colors.dark,
}: Props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const close = useCallback(() => {
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }).start(({finished}) => {
        if (finished) {
          onDissmiss();
        }
      });
    }, duration);
  }, [duration, fadeAnim, onDissmiss]);

  useEffect(() => {
    (() => {
      if (visible) {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start(({finished}) => {
          if (finished) {
            close();
          }
        });
      }
    })();
  }, [close, fadeAnim, visible]);

  return visible ? (
    <Animated.View
      style={[styles.container, {backgroundColor: bgColor, opacity: fadeAnim}]}>
      <Text style={{color: textColor}}>{children}</Text>
    </Animated.View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    paddingHorizontal: 10,
    marginHorizontal: 10,
    bottom: Dimensions.get('screen').height / 8.5,
    minHeight: 40,
    alignSelf: 'center',
  },
  dismiss: {
    marginLeft: 15,
  },
});

export default Snackbar;
