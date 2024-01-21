import React from 'react';
import {Image, StyleProp, ImageStyle} from 'react-native';

const defaultSize = 64;

type Props = React.ComponentPropsWithRef<typeof Image> & {
  source: string;
  size?: number;
  style?: StyleProp<ImageStyle>;
};

const Avatar = ({size = defaultSize, source, style}: Props) => (
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
  />
);

export default Avatar;
