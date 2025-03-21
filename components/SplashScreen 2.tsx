import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withDelay,
  runOnJS
} from 'react-native-reanimated';
import { useWindowDimensions } from 'react-native';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps): JSX.Element => {
  const { width, height } = useWindowDimensions();
  const opacity = useSharedValue(1);

  useEffect(() => {
    // Animation de fondu
    opacity.value = withDelay(
      1000, // Commence le fade out après 1s
      withTiming(0, {
        duration: 1000 // Fade out plus lent
      }, (finished) => {
        if (finished) {
          runOnJS(onComplete)();
        }
      })
    );
  }, []);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.container, containerStyle, { width, height }]}>
      <Animated.Image
        source={require('../../assets/images/logo-plantitity.svg')}
        style={styles.logo}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  logo: {
    width: 150,
    height: 150,
  }
});

export default SplashScreen;
