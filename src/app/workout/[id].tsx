import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function WorkoutScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Workout #{id}</Text>
    </View>
  );
}
