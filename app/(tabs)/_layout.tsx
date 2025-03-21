import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#70E000",
        tabBarInactiveTintColor: "#666",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            flex: 1,
            position: 'absolute',
            bottom: 30,
            marginHorizontal: 50,
            borderRadius: 10,
            backgroundColor: '#F7F5FA',
            height: 65,
            flexDirection: 'row',
            justifyContent: 'space-between',
          },
          default: {
            flex: 1,
            position: 'absolute',
            bottom: 30,
            marginHorizontal: 50,
            borderRadius: 10,
            backgroundColor: '#F7F5FA',
            height: 65,
            flexDirection: 'row',
            justifyContent: 'space-between',
          },
        }),
        tabBarLabelStyle: {
          display: 'none'
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color }) => <IconSymbol size={32} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          title: 'Caméra',
          tabBarIcon: ({ color }) => <IconSymbol size={32} name="camera.fill" color={color} />,
          tabBarStyle: { display: 'none' },
          headerShown: false, 
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Compte',
          tabBarIcon: ({ color }) => <IconSymbol size={32} name="person.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
