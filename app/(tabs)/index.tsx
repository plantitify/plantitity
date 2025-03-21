import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { useRouter } from 'expo-router';

import { IconSymbol } from '@/components/ui/IconSymbol';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenue sur Plantitity</Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/camera')}>
          <IconSymbol size={24} name="camera.fill" color="#FFFFFF" />
          <Text style={styles.buttonText}>Prendre une photo</Text>
        </TouchableOpacity>
      </View>
    </> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#70E000',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    gap: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
