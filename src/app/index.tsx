import { Text, View } from '@/components/general/Themed';
import { Link } from 'expo-router';
import React from 'react';

export default function HomeScreen() {
  return (
    <View>
      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Home</Text>
      <Link href="/workout/current">
        <Text>Current Workout</Text>
      </Link>

      <Link href="/workout/1">
        <Text>Workout #1</Text>
      </Link>
    </View>
  );
}
