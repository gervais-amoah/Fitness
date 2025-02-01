import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from '@/components/general/Themed';

export default function WorkoutScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Workout #{id}</Text>
    </View>
  );
}
