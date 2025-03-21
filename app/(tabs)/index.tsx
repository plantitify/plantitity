import { StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Bienvenue sur Plantitify</ThemedText>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/camera')}>
          <IconSymbol size={24} name="camera.fill" color="#FFFFFF" />
          <ThemedText style={styles.buttonText}>Prendre une photo</ThemedText>
        </TouchableOpacity>
      </ThemedView>
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
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
