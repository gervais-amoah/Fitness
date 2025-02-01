import { Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View>
      <Link href="/workout/current">
        <Text>Current Workout</Text>
      </Link>

      <Link href="/workout/1">
        <Text>Workout #1</Text>
      </Link>
      <Text>Home Screen</Text>
    </View>
  );
}
