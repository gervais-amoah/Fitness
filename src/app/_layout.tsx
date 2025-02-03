import { Stack } from 'expo-router';
import React from 'react';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

DarkTheme.colors.primary = Colors.dark.tint;
DefaultTheme.colors.primary = Colors.light.tint;

export default function RootLayout() {
  const colorsScheme = useColorScheme();

  return (
    <ThemeProvider value={colorsScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView>
        <Stack>
          <Stack.Screen name="index" options={{ title: 'Home' }} />
          <Stack.Screen
            name="workout/current"
            options={{ title: 'Current Workout' }}
          />
          <Stack.Screen name="workout/[id]" options={{ title: 'Workout' }} />
        </Stack>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
