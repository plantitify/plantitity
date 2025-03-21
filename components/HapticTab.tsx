import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import * as Haptics from 'expo-haptics';
import { StyleSheet, Pressable, View } from 'react-native';

export function HapticTab({
  accessibilityState,
  children,
  onPress,
  ...props
}: BottomTabBarButtonProps) {
  return (
    <Pressable
      onPress={() => {
        if (process.env.EXPO_OS === 'ios') {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        onPress?.();
      }}
      style={styles.tab}
      {...props}
    >
      <View style={[
        styles.iconContainer,
        accessibilityState?.selected && styles.activeIconContainer
      ]}>
        {children}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    padding: 10,
    borderRadius: 8,
  },
  activeIconContainer: {
    backgroundColor: '#70E00015',
  },
});
