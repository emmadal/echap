import React, {useState} from 'react';
import {
  type StyleProp,
  type ViewStyle,
  type ViewProps,
  StyleSheet,
  Image,
  View,
  ActivityIndicator,
} from 'react-native';
import type {AnimatedProps} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import colors from 'themes/colors';

interface Props extends AnimatedProps<ViewProps> {
  style?: StyleProp<ViewStyle>;
  index?: number;
  pretty?: boolean;
  showIndex?: boolean;
  img?: string;
}

export const SlideItem: React.FC<Props> = props => {
  const {index, img, testID, ...animatedViewProps} = props;
  const [loading, setLoading] = useState(false);
  return (
    <Animated.View
      testID={testID}
      style={styles.container}
      {...animatedViewProps}>
      <View style={styles.imgContainer}>
        <Image
          key={index}
          style={styles.image}
          source={{uri: img}}
          resizeMode="cover"
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
        />
        <ActivityIndicator
          style={styles.activityIndicator}
          color={colors.primary}
          animating={loading}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  imgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
    overflow: 'hidden',
  },
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
