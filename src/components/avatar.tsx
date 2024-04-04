import React, {useState} from 'react';
import {
  Image,
  StyleProp,
  ImageStyle,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import colors from 'themes/colors';

const defaultSize = 64;

type Props = React.ComponentPropsWithRef<typeof Image> & {
  source: string;
  size?: number;
  style?: StyleProp<ImageStyle>;
};

const Avatar = ({size = defaultSize, source, style}: Props) => {
  const [loading, setLoading] = useState(false);

  return (
    <View>
      <Image
        source={{uri: source}}
        resizeMode="cover"
        style={[
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
          style,
        ]}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
      <ActivityIndicator
        style={styles.activityIndicator}
        color={colors.primary}
        animating={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

export default Avatar;
