import { View, type ViewProps } from 'react-native';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
};

export function ThemedView({ style, lightColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = lightColor || '#FFFFFF';

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
