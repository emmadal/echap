import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import {windowScaled} from 'utils/window';
import {SlideItem} from 'components/SlideItem';

const PAGE_WIDTH = windowScaled.width;

const Slide = ({photos}: {photos: Array<string>}) => {
  const progressValue = useSharedValue<number>(0);
  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH,
    height: PAGE_WIDTH * 1,
  } as const;
  return (
    <View style={styles.container}>
      <Carousel
        {...baseOptions}
        style={{
          width: PAGE_WIDTH,
        }}
        loop
        pagingEnabled
        snapEnabled
        autoPlay={true}
        autoPlayInterval={2000}
        onProgressChange={(_, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        data={photos}
        renderItem={({item, index}) => <SlideItem index={index} img={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
export default Slide;
