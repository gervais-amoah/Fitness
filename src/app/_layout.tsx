import Colors from '@/constants/Colors';
import { dbName, getDB } from '@/db';
import { useWorkoutStore } from '@/store';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import { Stack } from 'expo-router';
import * as SQLite from 'expo-sqlite';
import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

DarkTheme.colors.primary = Colors.dark.tint;
DefaultTheme.colors.primary = Colors.light.tint;

const db = SQLite.openDatabaseSync(dbName);
// SQLite.deleteDatabaseSync(dbName); // Uncomment to delete the database, useful for testing

export default function RootLayout() {
  const colorsScheme = useColorScheme();
  useDrizzleStudio(db);

  const loadWorkouts = useWorkoutStore((state) => state.loadWorkouts);
  useEffect(() => {
    loadWorkouts();
  }, [loadWorkouts]);

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
