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
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import * as SQLite from 'expo-sqlite';
import { dbName, getDB } from '@/db';

DarkTheme.colors.primary = Colors.dark.tint;
DefaultTheme.colors.primary = Colors.light.tint;

const db = SQLite.openDatabaseSync(dbName);
// SQLite.deleteDatabaseSync(dbName); // Uncomment to delete the database, useful for testing
getDB();

export default function RootLayout() {
  const colorsScheme = useColorScheme();
  useDrizzleStudio(db);

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
