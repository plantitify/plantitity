import { Text, type TextProps } from 'react-native';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  type?: 'default' | 'defaultSemiBold' | 'subtitle' | 'title' | 'link';
};

export function ThemedText({ style, lightColor, type = 'default', ...otherProps }: ThemedTextProps) {
  const color = lightColor || '#000000';
  
  let textStyle = {};
  switch (type) {
    case 'title':
      textStyle = { fontSize: 24, fontWeight: 'bold' };
      break;
    case 'subtitle':
      textStyle = { fontSize: 18, fontWeight: '600' };
      break;
    case 'defaultSemiBold':
      textStyle = { fontWeight: '600' };
      break;
    case 'link':
      textStyle = { color: '#70E000', textDecorationLine: 'underline' };
      break;
  }

  return <Text style={[{ color }, textStyle, style]} {...otherProps} />;
}
