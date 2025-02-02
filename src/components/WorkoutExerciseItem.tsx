import { ExerciseWithSets } from '@/types/models';
import React from 'react';
import { Text, View } from 'react-native';
import Card from './general/Card';

export default function WorkoutExerciseItem({
  item,
}: {
  item: ExerciseWithSets;
}) {
  return (
    <Card title={item.name}>
      <View>
        {item.sets.map((set) => (
          <View key={set.id} style={{ gap: 5 }}>
            <Text>{set.weight}</Text>
            <Text>{set.reps} reps</Text>
          </View>
        ))}
      </View>
    </Card>
  );
}
